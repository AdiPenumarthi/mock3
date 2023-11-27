import './index.css'

const NotFound = props => {
  const {retry} = props
  const retryPageAgain = () => {
    retry()
  }
  return (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="oops-msg">Oops! Something Went Wrong</h1>
      <p className="message">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={retryPageAgain}>
        Retry
      </button>
    </div>
  )
}

export default NotFound
