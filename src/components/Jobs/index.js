import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill, BsSearch} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    employmentType: [],
    salary: '',
    profileInfo: '',
    jobsInfo: '',
    isLoading: true,
    renderFail: false,
    renderRetryProfile: false,
  }

  componentDidMount() {
    this.getJobs()
    this.getJobBanners()
  }

  renderNoJobs = () => (
    <div className="no-jobs-div">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-h1">No Jobs Found</h1>
      <p className="no-jobs-p">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  getJobs = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const camelProfile = {
        profileImageUrl: data.profile_details.profile_image_url,
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({profileInfo: camelProfile, renderRetryProfile: false})
    } else {
      this.setState({renderRetryProfile: true})
    }
  }

  sortJobs = () => {
    this.getJobBanners()
  }

  getJobBanners = async () => {
    this.setState({isLoading: true})
    const {searchInput, salary, employmentType} = this.state
    const joinedArray = employmentType.join(',')

    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }

    const url = `https://apis.ccbp.in/jobs?employment_type=${joinedArray}&minimum_package=${salary}&search=${searchInput}`
    const response = await fetch(url, options)
    if (response.ok) {
      const responseData = await response.json()

      if (responseData.jobs.length >= 1) {
        const camelData = responseData.jobs.map(each => ({
          id: each.id,
          companyLogoUrl: each.company_logo_url,
          employmentTypo: each.employment_type,
          jobDescription: each.job_description,
          location: each.location,
          packagePerAnnum: each.package_per_annum,
          rating: each.rating,
          title: each.title,
        }))

        this.setState({
          renderFail: false,
          isLoading: false,
          jobsInfo: camelData,
        })
      } else {
        this.setState({isLoading: false, renderFail: true})
      }
    }
  }

  employeeOption = event => {
    const val = event.target.checked
    if (val) {
      this.setState(
        pre => ({
          employmentType: [...pre.employmentType, event.target.id],
        }),
        this.getJobBanners,
      )
    } else {
      this.setState(
        pre => ({
          employmentType: [
            ...pre.employmentType.filter(each => each !== event.target.id),
          ],
        }),
        this.getJobBanners,
      )
    }
  }

  salaryOption = event => {
    const val = event.target.checked
    if (val) {
      this.setState({salary: event.target.id}, this.getJobBanners)
    } else {
      this.setState({salary: ''})
    }
  }

  setInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderLoader = () => (
    <div className="loader-container loader-div" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJob = item => {
    const {
      id,
      companyLogoUrl,
      employmentTypo,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = item

    return (
      <Link to={`/jobs/${id}`} className="link-item" key={id}>
        <li className="job-info-card">
          <div className="logo-title-rating">
            <div className="logo-div">
              <img src={companyLogoUrl} alt="company logo" className="logo" />
            </div>
            <div className="title-rating">
              <h1 className="title">{title}</h1>
              <div className="rating-div">
                <AiFillStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-employment-package">
            <div className="location-div">
              <MdLocationOn className="location-icon" />
              <p className="location-p">{location}</p>
            </div>
            <div className="location-div">
              <BsBriefcaseFill className="location-icon" />
              <p className="location-p">{employmentTypo}</p>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="hr" />
          <div className="job-desc-div">
            <h1 className="desc">Description</h1>
            <p className="j-desc">{jobDescription}</p>
          </div>
        </li>
      </Link>
    )
  }

  tryAgain = () => this.getJobs()

  renderRetryProfileBtn = () => (
    <div className="retry-pbtn">
      <button type="button" className="rbtn" onClick={this.tryAgain}>
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
    const {renderFail, jobsInfo} = this.state

    if (!renderFail) {
      return jobsInfo.map(each => this.renderJob(each))
    }
    return this.renderNoJobs()
  }

  render() {
    const {searchInput, profileInfo, isLoading, renderRetryProfile} = this.state
    const {profileImageUrl, name, shortBio} = profileInfo

    return (
      <div className="jobs-page">
        <Header />
        <div className="jobs-bottom">
          <div className="left-part">
            {renderRetryProfile ? (
              this.renderRetryProfileBtn()
            ) : (
              <div className="profile-card">
                <img
                  src={profileImageUrl}
                  alt="profile"
                  className="profile-pic"
                />
                <h1 className="profile-name">{name}</h1>
                <p className="profile-bio">{shortBio}</p>
              </div>
            )}
            <hr className="hr-line" />
            <div className="employee-card">
              <h1 className="employee">Type of Employment</h1>
              <ul className="employee-list">
                {employmentTypesList.map(each => (
                  <li key={each.employmentTypeId} className="list-item">
                    <input
                      type="checkbox"
                      className="checkbox"
                      id={each.employmentTypeId}
                      onClick={this.employeeOption}
                    />
                    <label htmlFor={each.employmentTypeId} className="label">
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="hr-line" />
            <div className="employee-card">
              <h1 className="employee">Salary Range</h1>
              <ul className="employee-list">
                {salaryRangesList.map(each => (
                  <li key={each.salaryRangeId} className="list-item">
                    <input
                      type="radio"
                      className="checkbox"
                      name="radioBtn"
                      id={each.salaryRangeId}
                      onClick={this.salaryOption}
                    />
                    <label
                      htmlFor={each.salaryRangeId}
                      className="label-salary"
                    >
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right-part">
            <div className="search-div">
              <input
                type="search"
                className="search"
                placeholder="Search"
                onChange={this.setInput}
                value={searchInput}
              />
              <button
                className="search-btn"
                type="button"
                onClick={this.sortJobs}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul className="jobs-div">
              {isLoading ? this.renderLoader() : this.renderJobs()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs

/* 
    
*/
