import React, { Component } from 'react';

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      loading: false,
      error: ''
    }
  }

  render () {
    const { mode } = this.props.match.params

    return <React.Fragment>
      <div>Login {mode}</div>
      <input type='text' value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
      <input type='password' value={this.state.password} onChange={e => this.setState({ passsword: e.target.value })} />
      <button onClick={() => this.login()}>Login</button>

      {
        this.state.loading && <div>Loading...</div>
      }

      {
        this.state.error && <div>{this.state.error}</div>
      }

      {
        mode === 'mock' && (
          <div>
            <p>Mocked accounts</p>
            <button onClick={() => this.setState({ username: 'nonorg' }, () => this.login())}>Without org</button>
            <button onClick={() => this.setState({ username: 'org' }, () => this.login())}>With org</button>
            <button onClick={() => this.setState({ username: 'neither' }, () => this.login())}>Error</button>
          </div>

        )
      }
    </React.Fragment>
  }

  login () {
    const { mode } = this.props.match.params
    this.setState({ loading: true })
    window.api[mode].auth(this.state.username, this.state.password)
      .then(
        user => {
          this.setState({ loading: false })

          const { mode } = this.props.match.params
          this.props.history.push(`/login/${mode}/orgs/${this.state.username}`)
        },
        e => this.setState({ loading: false, error: e.message })
      )
  }
}

export default Login
