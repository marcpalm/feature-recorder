import React from 'react'

class FilePresenter extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      content: undefined,
      error: undefined,
      file: undefined
    }
  }
  componentDidMount () {
    const {
      mode, owner, repo, branch
    } = this.props.match.params

    const file = this.props.location.pathname.replace(`/${mode}/${owner}/${repo}/${branch}/`, '')

    window.api[mode].getContent(owner, repo, branch, file).then(
      content => this.setState({ content, file }),
      e => this.setState({ error: e ? e.message || e : 'Error'})
    )
  }

  render () {
    const {
      content,
      error,
      file
    } = this.state

    const {
      mode, owner, repo, branch
    } = this.props.match.params

    return content ? (
      <div>
        <p>Repo {owner}/{repo} @ {branch}</p>
        <p>File /{file}</p>
        <textarea value={content} onChange={e => this.setState({ content: e.target.value})} />
      </div>
    ): <div>{error || 'Loading Data...'}</div>
  }
}

export {
  FilePresenter
}