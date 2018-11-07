import React from 'react';

export const Choose = ({
  choices,
  setChoice,
  createNewChoice,
  createNewChoiceLabel,
  error
}) => (
  <ul style={{ width: 40}}>
    {createNewChoiceLabel && createNewChoice && <li onClick={() => createNewChoice()}>{createNewChoiceLabel}</li>}
    {choices.map((choice, index) => (
      <li key={index} onClick={() => setChoice(choice)}><p>{choice.label || choice}</p></li>
    ))}
    { error && <li>{error}</li>}
  </ul>
)

class GetAndChoose extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      choices: undefined,
      error: undefined
    }
  }
  componentDidMount () {
    this.props.getChoices().then(
      choices => {
        this.setState({ choices })
      },
      e => this.setState({ error: e ? e.message || e : 'Error'})
    )
  }

  render () {
    const {
      choices,
      error
    } = this.state

    const {
      setChoice,
      createNewChoice,
      createNewChoiceLabel
    } = this.props

    return !error && choices ? (
      <Choose 
        setChoice={setChoice}
        createNewChoice={createNewChoice}
        createNewChoiceLabel={createNewChoiceLabel}
        choices={choices}
      />
    ) : <div>{error || 'Loading Data...'}</div>
  }
}

const ListOfOrgs = ({
  match,
  history
}) => {
  const {
    mode,
    user
  } = match.params

  return <GetAndChoose
    getChoices={() => window.api[mode].getOrgs(user)}
    setChoice={(org) => history.push(`/${mode}/${org}`)} 
  />
}

const ListOfRepos = ({
  match,
  history
}) => {
  const {
    mode,
    owner
  } = match.params

  return <GetAndChoose
    getChoices={() => window.api[mode].getRepos(owner)}
    setChoice={(repo) => history.push(`/${mode}/${owner}/${repo}`)} 
  />
}

const ListOfBranches = ({
  match,
  history
}) => {
  const {
    mode,
    owner,
    repo
  } = match.params

  return <GetAndChoose
    getChoices={() => window.api[mode].getBranches(owner, repo)}
    setChoice={(branch) => history.push(`/${mode}/${owner}/${repo}/${encodeURIComponent(branch)}`)}
  />
}

const ListOfFeatures = ({
  match,
  history
}) => {
  const {
    mode,
    owner,
    repo,
    branch
  } = match.params

  return <GetAndChoose
    getChoices={() => window.api[mode].getFeatures(owner, repo, branch)}
    setChoice={(feature) => history.push(`/${mode}/${owner}/${repo}/${encodeURIComponent(branch)}/${feature}`)}
  />
}

export {
  ListOfBranches,
  ListOfOrgs,
  ListOfRepos,
  ListOfFeatures
}