import React from 'react'

import { Choose } from './Lists'

import AceEditor from 'react-ace'
import 'brace/theme/monokai'
import 'brace/mode/javascript'

const ListOfFiles = ({
  history,
  location,
  filesOrDir
}) => (
  <Choose
    choices={filesOrDir}
    setChoice={(fileOrDir) => {
      history.push(`${location.pathname}/${fileOrDir}`.replace(`//`, '/'))
    }}/>
)

class FilePresenter extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      content: undefined,
      error: undefined,
      file: undefined
    }
  }

  load () {
    const {
      mode, owner, repo, branch
    } = this.props.match.params

    const file = this.props.location.pathname.replace(`/${mode}/${owner}/${repo}/${branch}`, '') || '/'

    window.api[mode].getContent(owner, repo, decodeURIComponent(branch), file).then(
      content => this.setState({ content, file }),
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
      file
    } = this.state

    const {
      owner, repo, branch
    } = this.props.match.params

    return content ? (
      <div>
        <p>Repo {owner}/{repo} @ {decodeURIComponent(branch)}</p>
        <p>Path {file}</p>
        { Array.isArray(content)
          ? <ListOfFiles history={this.props.history} location={this.props.location} filesOrDir={content} />
          : <div>
              <AceEditor
                mode="javascript"
                theme="monokai"
                name="blah2"
                onLoad={() => console.log('Loaded')}
                onChange={(content) => {
                  this.setState({ content})
                }}
                onBlur={() => alert('safe ?')}
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
              <button>Sync</button>
            </div>
        }
      </div>
    ): <div>{error || 'Loading Data...'}</div>
  }
}

export {
  FilePresenter
}