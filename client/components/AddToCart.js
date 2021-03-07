import React from 'react'
import {connect} from 'react-redux'
import {guestProduct} from '../store/order'

class AddToCart extends React.Component {
  constructor() {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    console.log('clicked!')
    this.props.guestProduct(this.props.productId)
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
    guestProduct: productId => dispatch(guestProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(AddToCart)
