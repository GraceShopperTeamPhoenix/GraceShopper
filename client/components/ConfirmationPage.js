import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store'
import user from '../store/user'

class ConfirmationPage extends React.Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {email} = this.props
    return (
      <div>
        <h3>Your order is in!</h3>
        <div>A confirmation email has been sent to {email}</div>
        <br />
        <div>Here's what you ordered:</div>
        {/* insert order here */}
      </div>
    )
  }
}

const mapState = state => {
  console.log('mapping state to props with state', state)
  return {
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(ConfirmationPage)
