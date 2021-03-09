import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getProfile} from '../store'
import {Orders} from './Orders'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const id = this.props.user.id
    if (id) {
      this.props.getProfile(id)
    }
  }

  render() {
    const {firstName, lastName, email, address, isAdmin} = this.props.user
    const profile = this.props.userProfile || {}

    return (
      <div>
        <div className="profileWelcome">
          <h3>Welcome, {firstName}!</h3>
        </div>

        <div className="profileContainer">
          <div className="profileOrderBox">
            <h3>My Orders</h3>
            <hr />
            <div>
              {profile && profile.orders && profile.orders.length ? (
                <Orders profile={profile} />
              ) : (
                <p>No orders.</p>
              )}
            </div>
          </div>
          <div className="profileBox">
            <h3>My Profile</h3>
            <hr />
            <p>
              Name: {firstName} {lastName}
            </p>
            <p>Email: {email}</p>
            <p>Address: {address}</p>
            {isAdmin && <h4>Admin</h4>}
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    userProfile: state.profile
  }
}

const mapDispatch = dispatch => {
  return {
    getProfile: id => {
      dispatch(getProfile(id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
