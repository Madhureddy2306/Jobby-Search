import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  setUsername = event => {
    this.setState({username: event.target.value})
  }

  setPassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const body = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      Cookies.set('jwt_token', data.jwt_token, {expires: 10})
      this.setState({errorMsg: ''})
      const {history} = this.props
      history.replace('/')
    } else {
      const data = await response.json()
      this.setState({errorMsg: `*${data.error_msg}`})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state

    return (
      <div className="login-page">
        <form className="login-card">
          <div className="job-logo-div">
            <img
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="jobby-logo"
            />
          </div>
          <label className="names" htmlFor="user">
            USERNAME
          </label>
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            onChange={this.setUsername}
            id="user"
          />
          <label className="names" htmlFor="pass">
            PASSWORD
          </label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={this.setPassword}
            id="pass"
          />
          <button type="submit" className="login-btn" onClick={this.submitForm}>
            Login
          </button>
          <p className="error">{errorMsg}</p>
        </form>
      </div>
    )
  }
}

export default Login
