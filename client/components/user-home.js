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
    const {email} = this.props.user
    const profile = this.props.userProfile
    const container = {
      display: 'flex',
      justifyContent: 'space-between',
      marginLeft: '12.5%',
      marginRight: '12.5%'
    }
    const orderBox = {
      border: '1px gray solid',
      margin: '20px',
      padding: '10px',
      width: '40%'
    }

    const profileBox = {
      border: '1px gray solid',
      margin: '20px',
      padding: '10px',
      width: '40%'
    }

    if (profile.id) {
      return (
        <div>
          <h3>Welcome, {email}</h3>
          <div style={container}>
            <div style={orderBox}>
              <h3>My Orders</h3>
              <hr />
              <div>
                {profile.orders.length ? (
                  <Orders profile={profile} />
                ) : (
                  <p>No orders.</p>
                )}
              </div>
            </div>
            <div style={profileBox}>
              <h3>My Profile</h3>
              <hr />
              <p>
                Name: {profile.firstName} {profile.lastName}
              </p>
              <p>Email: {profile.email}</p>
              <p>Address: {profile.address}</p>
              {profile.isAdmin && <h4>Admin</h4>}
            </div>
          </div>
        </div>
      )
    } else {
      return <h4>No user profile found</h4>
    }
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
