import React, { Component } from 'react';

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      error: ''
    }

    this.username = React.createRef()
    this.password = React.createRef()
  }

  render () {
    const { mode } = this.props.match.params

    return <React.Fragment>
      <div>Login {mode}</div>
      <input type='text' ref={this.username} />
      <input type='password' ref={this.password} />
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
    const password = this.password.current.value
    const username = this.username.current.value
    this.setState({ loading: true })
    window.api[mode].auth(username, password)
      .then(
        user => {
          this.setState({ loading: false })

          const { mode } = this.props.match.params
          this.props.history.push(`/login/${mode}/orgs/${username}`)
        },
        e => this.setState({ loading: false, error: e.message })
      )
  }
}

export default Login
