import './index.css'

const NotFound = () => (
  <div className="not-found-div">
    <img
      alt="not found"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      className="nf"
    />
    <h1 className="nf-h1">Page Not Found</h1>
    <p className="nf-p">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
