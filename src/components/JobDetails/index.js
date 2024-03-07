import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class JobDetails extends Component {
  state = {isLoading: true, jobDetails: '', similarJobs: '', renderFail: false}

  componentDidMount() {
    this.getJobInfo()
  }

  retry = () => {
    this.getJobInfo()
  }

  renderFailCard = () => (
    <div className="failure-div">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="fail-img"
      />
      <h1 className="fail-h1">Oops! Something Went Wrong</h1>
      <p className="fail-p">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="fail-btn" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  getJobInfo = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`

    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    console.log(response)

    if (response.ok) {
      const jobData = await response.json()

      const camelInfo = {
        companyLogoUrl: jobData.job_details.company_logo_url,
        companyWebsiteUrl: jobData.job_details.company_website_url,
        employmentTypee: jobData.job_details.employment_type,
        id: jobData.job_details.id,
        jobDescription: jobData.job_details.job_description,
        locational: jobData.job_details.location,
        packagePerAnnum: jobData.job_details.package_per_annum,
        rating: jobData.job_details.rating,
        title: jobData.job_details.title,
        skills: jobData.job_details.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
        lifeAtCompany: {
          description: jobData.job_details.life_at_company.description,
          imageUrl: jobData.job_details.life_at_company.image_url,
        },
      }

      const similarJobsData = jobData.similar_jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDetails: camelInfo,
        similarJobs: similarJobsData,
        isLoading: false,
        renderFail: false,
      })
    } else {
      this.setState({renderFail: true, isLoading: false})
    }
  }

  renderJobCard = () => {
    const {jobDetails, similarJobs, renderFail} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentTypee,
      jobDescription,
      locational,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobDetails

    const {description, imageUrl} = lifeAtCompany

    return (
      <>
        {renderFail ? (
          this.renderFailCard()
        ) : (
          <>
            <div className="job-detailed-card">
              <div className="logo-title-rating">
                <div className="logo-div">
                  <img
                    src={companyLogoUrl}
                    alt="job details company logo"
                    className="logo"
                  />
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
                  <p className="location-p">{locational}</p>
                </div>
                <div className="location-div">
                  <BsBriefcaseFill className="location-icon" />
                  <p className="location-p">{employmentTypee}</p>
                </div>
                <p className="package">{packagePerAnnum}</p>
              </div>
              <hr className="hr" />
              <div className="job-desc-div">
                <div className="desc-flex">
                  <h1 className="desc">Description</h1>
                  <a
                    href={companyWebsiteUrl}
                    rel="noreferrer"
                    className="anchor"
                    target="_blank"
                  >
                    Visit
                    <FiExternalLink className="web-link" />
                  </a>
                </div>
                <p className="j-desc">{jobDescription}</p>
              </div>
              <div className="skills-div">
                <h1 className="desc">Skills</h1>
                <ul className="ul-list">
                  {skills.map(each => (
                    <div className="icon-skill-p" key={each.name}>
                      <img
                        src={each.imageUrl}
                        alt={each.name}
                        className="skill-icon"
                      />
                      <p className="skill-p">{each.name}</p>
                    </div>
                  ))}
                </ul>
              </div>
              <div className="life-at-com-div">
                <h1 className="desc">Life at Company</h1>
                <div className="life-img">
                  <p className="de">{description}</p>
                  <img src={imageUrl} alt="life at company" className="img" />
                </div>
              </div>
            </div>
            <div className="similar-div">
              <h1 className="desc">Similar Jobs</h1>
              <ul className="sim-list">
                {similarJobs.map(each => (
                  <li className="sim-card" key={each.id}>
                    <div className="logo-title-rating">
                      <div className="logo-div">
                        <img
                          src={each.companyLogoUrl}
                          alt="similar job company logo"
                          className="logo"
                        />
                      </div>
                      <div className="title-rating">
                        <h1 className="title">{each.title}</h1>
                        <div className="rating-div">
                          <AiFillStar className="star" />
                          <p className="rating">{each.rating}</p>
                        </div>
                      </div>
                    </div>
                    <h1 className="desc">Description</h1>
                    <p className="de">{each.jobDescription}</p>
                    <div className="location-div">
                      <MdLocationOn className="location-icon" />
                      <p className="location-p">{each.location}</p>
                    </div>
                    <div className="location-div">
                      <BsBriefcaseFill className="location-icon" />
                      <p className="location-p">{each.employmentType}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container loader-div-info" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="job-details-page">
        <Header />
        <div className="job-card">
          {isLoading ? this.renderLoader() : this.renderJobCard()}
        </div>
      </div>
    )
  }
}

export default JobDetails
