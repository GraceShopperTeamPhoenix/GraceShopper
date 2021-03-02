import React from 'react'
import {connect} from 'react-redux'
import {myCart} from '../store'

export class Cart extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log('COMPONENT MOUNTED')
    console.log('PROPS =>', this.props)
    const id = this.props.userId
    // use session id if no user
    // const id = this.props.userId || sessionId
    if (!this.props.cart.id) {
      console.log('no cart')
      console.log('id is ', id)
      this.props.getMyCart(id)
    }
  }

  render() {
    if (this.props.cart.id) {
      return (
        <div>
          <h1>CART</h1>
          {this.props.cart.cartItems.map(item => {
            return (
              <div key={item.id}>
                <h2>Item name</h2>
                {/* <p>{item.product.name}</p> */}
                <img src="/succulent.jpg" width="50px" />
                {/* <img src='{item.product.imageUrl}' width='50px'/> */}
                <p>
                  <button>+</button>Quantity: {item.quantity}
                  <button>-</button>
                </p>
                <button>Delete Item</button>
              </div>
            )
          })}
        </div>
      )
    } else {
      return <h1>no cart</h1>
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cart: state.cart,
    user: state.user,
    // userId: state.user.id
    userId: 1
  }
}

const mapDispatch = dispatch => {
  return {
    getMyCart: id => dispatch(myCart(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)

/**
 * PROP TYPES
 */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
