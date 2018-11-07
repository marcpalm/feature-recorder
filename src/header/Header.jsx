import React from 'react'
import { Link } from 'react-router-dom'


class Header extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: false,
      error: undefined,
      loggedIn: undefined
    }
  }

  updateLoginInfo () {
    this.setState({
      loading: true
    })

    window.api[this.props.match.params.mode].isLoggedIn().then(
      loggedIn => this.setState({ loggedIn, loading: false, error: undefined }),
      error => this.setState({ error: error.message, loading: false })
    )
  }

  componentDidMount () {
    this.updateLoginInfo()
  }

  componentDidUpdate (prevProps) {
    const loginPage = `/login/${this.props.match.params.mode}`
    if (prevProps.location.pathname === loginPage && this.props.location.pathname !== loginPage) {
      this.updateLoginInfo()
    }
  }

  render () {
    const {
      mode
    } = this.props.match.params

    const {
      loading,
      error,
      loggedIn
    } = this.state

    console.log(window.api, mode)

    return loading
      ? <p>Loading</p>
      : error
        ? <p>{error}</p>
        : loggedIn
          ? (
            <button onClick={() => {
              this.setState({
                loading: true
              })

              window.api[mode].logout().then(
                () => this.setState({ loggedIn: false, loading: false, error: undefined }),
                error => this.setState({ error: error.message, loading: false })
              )
            }}>Logout</button>
          )
          : (
            <p>You are currently not loggedIn. You can only see public information. <Link to={`/login/${mode}`}>Please login</Link></p>
          )
  }
}


export {
  Header
}