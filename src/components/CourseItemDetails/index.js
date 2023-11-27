import {Component} from 'react'
import Loader from 'react-loader-spinner'

import NotFound from '../NotFound'
import Header from '../Header'
import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

class CourseItemDetails extends Component {
  state = {apiStatus: apiConstants.initial, courseDetails: {}}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
    }
    const response = await fetch(`${apiUrl}/${id}`, options)
    const data = await response.json()

    if (response.status === 200) {
      const details = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.setState({courseDetails: details, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  retryPage = () => this.getCoursesList()

  getFailure = () => <NotFound retry={this.retryPage} />

  getCourseInfo = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.displayCourse()
      case 'FAILURE':
        return this.getFailure()
      case 'IN PROGRESS':
        return this.onLoader()
      default:
        return null
    }
  }

  displayCourse = () => {
    const {courseDetails} = this.state
    const {name, description, imageUrl} = courseDetails

    return (
      <div className="course-item-container">
        <img src={imageUrl} alt={name} className="image-course" />
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="course-container">
        <Header />
        {this.getCourseInfo()}
      </div>
    )
  }
}

export default CourseItemDetails
