import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const goToJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div className="home-div">
      <Header />
      <div className="home-body">
        <div className="info-card">
          <h1 className="home-h1">Find The Job That Fits Your Life</h1>
          <p className="millions">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and potential
          </p>
          <Link to="/jobs" className="link-item">
            <button type="button" className="jobs-btn" onClick={goToJobs}>
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
