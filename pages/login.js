import { Component } from 'react'
import { auth } from '../utils/auth';

class Login extends Component {
  static getInitialProps ({ req }) {
    const apiUrl = process.browser
      ? `https://${window.location.host}/api/login.js`
      : `https://${req.headers.host}/api/login.js`

    return { apiUrl }
  }

  constructor (props) {
    super(props)

    this.state = { username: '', error: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ username: event.target.value })
  }

  async handleSubmit (event) {
    event.preventDefault()
    const username = this.state.username
    const url = this.props.apiUrl
    login({ username, url }).catch(() =>
      this.setState({ error: 'Login failed.' })
    )
  }

  render () {
    return (
      <div>
        login page
      </div>
    )
  }
}

export default Login