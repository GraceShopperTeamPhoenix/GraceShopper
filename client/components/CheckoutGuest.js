import React from 'react'
import {connect} from 'react-redux'
import {checkoutGuestUser} from '../store/user'

/**
 * COMPONENT
 */
class CheckoutGuest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      guest: true
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit() {
    this.props.checkoutGuestUser(this.state)
    this.props.history.push('/confirmation')
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <form>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="address">
              <small>Address</small>
            </label>
            <input
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <button type="button" onClick={this.handleSubmit}>
              {' '}
              Submit{' '}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    checkoutGuestUser: user => dispatch(checkoutGuestUser(user))
  }
}

export default connect(null, mapDispatch)(CheckoutGuest)
