import React from 'react'
// import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    let users = this.props.users
    return (
      <div className="users-container">
        <h4>Users</h4>
        {users.map(user => {
          return (
            <div key={user.id} className="user-container">
              <div>
                {user.firstName} {user.lastName}
              </div>
              <div>{user.email}</div>
              <div>{user.address}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.users.all
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
