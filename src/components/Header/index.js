import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const exitUser = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-div">
      <div className="click-logo-div">
        <Link to="/" className="link-item">
          <li className="li">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-logo"
            />
          </li>
        </Link>
      </div>
      <ul className="home-jobs-div">
        <Link to="/" className="link-item">
          <li>
            <p className="home-link">Home</p>
          </li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li>
            <p className="home-link">Jobs</p>
          </li>
        </Link>
      </ul>
      <button type="button" className="logout-btn" onClick={exitUser}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
