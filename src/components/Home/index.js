import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import NotFound from '../NotFound'
import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {apiStatus: apiConstants.initial, coursesList: []}

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.status === 200) {
      const courses = data.courses.map(item => ({
        id: item.id,
        name: item.name,
        logoUrl: item.logo_url,
      }))

      this.setState({coursesList: courses, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getCourses = () => {
    const {coursesList} = this.state
    return (
      <>
        <h1 className="header">Courses</h1>
        <ul className="courses-container">
          {coursesList.map(item => (
            <Link to={`/courses/${item.id}`}>
              <li key={item.id} className="course-item">
                <img
                  src={item.logoUrl}
                  alt={item.name}
                  className="logo-image"
                />
                <p className="course-name">{item.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </>
    )
  }

  onLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  retryPage = () => this.getCoursesList()

  getFailure = () => <NotFound retry={this.retryPage} />

  getCoursesContainer = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.getCourses()
      case 'FAILURE':
        return this.getFailure()
      case 'IN PROGRESS':
        return this.onLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        {this.getCoursesContainer()}
      </div>
    )
  }
}

export default Home
