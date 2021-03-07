import React from 'react'
import {connect} from 'react-redux'
import {guestProduct, userProduct} from '../store/order'

class AddToCart extends React.Component {
  constructor() {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    console.log('click')
    if (this.props.user.id) {
      console.log('found user id, calling userProduct')
      this.props.userProduct(this.props.productId, this.props.user.id)
    } else {
      console.log('no user id, calling guestProduct')
      this.props.guestProduct(this.props.productId)
    }
  }

  render() {
    return (
      <button type="button" onClick={this.onClick}>
        Add to Cart
      </button>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    guestProduct: productId => dispatch(guestProduct(productId)),
    userProduct: (productId, userId) => dispatch(userProduct(productId, userId))
  }
}

export default connect(mapState, mapDispatch)(AddToCart)
