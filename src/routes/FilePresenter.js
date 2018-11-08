import React from 'react'

import { Choose } from './Lists'

import AceEditor from 'react-ace'
import 'brace/theme/monokai'
import 'brace/mode/javascript'

class FilePresenter extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      content: undefined,
      error: undefined,
      path: undefined
    }
  }

  load () {
    const {
      mode, owner, repo, branch
    } = this.props.match.params

    const path = this.props.location.pathname.replace(`/${mode}/${owner}/${repo}/${branch}`, '') || '/'

    window.api[mode].readFileOrDir({ owner, repo, branch: decodeURIComponent(branch), path }).then(
      content => this.setState({ content, path }),
      e => this.setState({ error: e ? e.message || e : 'Error'})
    )
  }

  componentDidMount () {
    this.load()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.load()
    }
  }

  render () {
    const {
      content,
      error,
      path
    } = this.state

    const {
      mode, owner, repo, branch: encCodedBranch
    } = this.props.match.params

    const branch = decodeURIComponent(encCodedBranch)

    return <div>
      {content ? (
        <div>
          <p>Repo {owner}/{repo} @ {decodeURIComponent(branch)}</p>
          <p>Path { Array.isArray(content) ? path: <input value={path} />}</p>
          { Array.isArray(content)
            ?   <Choose
                  choices={content}
                  setChoice={(fileOrDir) => {
                    this.props.history.push(`${this.props.location.pathname}/${fileOrDir}`.replace(`//`, '/'))
                  }}
                  createNewChoice={() => {
                    const path = 'examplename'

                    console.log(path, mode)
                    window.api[mode].createFile({owner, repo, branch, path, content: ''}).then(
                      () => {
                        setTimeout(() => this.props.history.push(`/${mode}/${owner}/${repo}/${branch}/${path}`), 500)
                      },
                      e => this.setState({ error: 'Not able to create new file: ' + e.message})
                    )

                  }}
                  createNewChoiceLabel='New File'
                />
            : <div>
                <AceEditor
                  mode="javascript"
                  theme="monokai"
                  name="blah2"
                  onLoad={() => console.log('Loaded')}
                  onChange={(content) => {
                    this.setState({content})
                  }}
                  fontSize={14}
                  showPrintMargin={true}
                  showGutter={true}
                  highlightActiveLine={true}
                  value={content.toString()}
                  setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                  }}
                />
                <textarea value={content} style={{ width: '100%' }} onChange={e => this.setState({ content: e.target.value})} />
                <button onClick={() => window.api[mode].updateFile({owner, repo, path, branch, content})}>Save</button>
                <button onClick={() => {
                  window.api[mode].deleteFile({owner, repo, path, branch}).then(
                    () => this.props.history.push(`/${mode}/${owner}/${repo}/${branch}`)
                  )
                }}>Delete</button>
              </div>
          }
        </div>
      ): <div>'Loading Data...'</div>}
      <div>{error}</div>
    </div>
  }
}

export {
  FilePresenter
}