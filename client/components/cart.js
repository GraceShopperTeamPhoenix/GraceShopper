import {check} from 'prettier'
import React from 'react'
import {connect} from 'react-redux'
import {
  myOrder,
  guestOrder,
  guestProduct,
  userProduct,
  userProductRemove,
  guestProductRemove
} from '../store'
import CheckoutGuest from './index'

export class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      guestCheckout: false
    }

    this.addClickHandler = this.addClickHandler.bind(this)
    this.removeClickHandler = this.removeClickHandler.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log('CART COMPONENT MOUNTED')
    const id = this.props.user.id
    const order = this.props.order
    if (id && !order.id) {
      console.log('USER ID YES - ORDER ID NO')
      this.props.getMyOrder(id)
    } else if (id && order.userId !== id) {
      console.log(
        'USER ID YES - USER ON CURRENT ORDER DOES NOT MATCH CURRENT USER'
      )
      this.props.getMyOrder(id)
    } else if (!id) {
      console.log('NO USER ID')
      // if no user is associated with state, get guest cart
      this.props.getGuestOrder()
    }
  }

  componentDidUpdate() {
    console.log('CART COMPONENT UPDATED')
    const id = this.props.user.id
    const order = this.props.order
    if (id && !order.id) {
      console.log('USER ID YES - ORDER ID NO')
      this.props.getMyOrder(id)
    }
  }

  addClickHandler(productId) {
    console.log('add clicked')
    if (this.props.user.id) {
      this.props.userProduct(productId, this.props.user.id)
    } else {
      this.props.guestProduct(productId)
    }
  }

  removeClickHandler(productId) {
    console.log('remove clicked')
    if (this.props.user.id) {
      this.props.userProductRemove(productId, this.props.user.id)
    } else {
      this.props.guestProductRemove(productId)
    }
  }

  handleSubmit() {
    if (this.props.user.id) {
      //add thunk to update cart status 'pending' switch 'received'
      history.push('/comfirmation')
    } else {
      this.setState({guestCheckout: true})
    }
  }

  render() {
    const user = this.props.user
    const order = this.props.order

    if (order.products) {
      if (order.products.length > 0) {
        let cartTotal = 0
        return (
          <div>
            <h1>My Cart</h1>
            <div className="flexbox-container">
              <div>
                {order.products.map(item => {
                  let quantity =
                    this.props.user.id && item.order_product
                      ? item.order_product.quantity
                      : item.quantity
                  let itemTotal = item.price / 100 * quantity
                  // let itemTotal = Math.round(item.price / 100 * quantity).toFixed(2)
                  cartTotal += itemTotal
                  return (
                    <div key={item.id} className="flex-item">
                      <div>
                        <img src={item.imageUrl} width="75px" />
                      </div>

                      <div>
                        <h2>{item.name}</h2>
                      </div>

                      <div>
                        <p>Item Total: ${itemTotal}</p>
                        <p>
                          <button
                            type="button"
                            onClick={() => this.removeClickHandler(item.id)}
                          >
                            -
                          </button>
                          Quantity: {quantity}
                          <button
                            type="button"
                            onClick={() => this.addClickHandler(item.id)}
                          >
                            +
                          </button>
                        </p>
                      </div>

                      <div>
                        <button>X</button>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div>
                <div>
                  <h1>Total: ${cartTotal.toFixed(2)}</h1>
                  <button type="submit" onClick={this.handleSubmit}>
                    Purchase
                  </button>
                </div>
                <div>{this.state.guestCheckout && <CheckoutGuest />}</div>
              </div>
            </div>
          </div>
        )
      } else {
        return <h1>No items in cart.</h1>
      }
    } else {
      return <h1>No items in cart.</h1>
    }
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    order: state.order,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getMyOrder: id => dispatch(myOrder(id)),
    getGuestOrder: () => dispatch(guestOrder()),
    userProduct: (productId, userId) =>
      dispatch(userProduct(productId, userId)),
    guestProduct: productId => dispatch(guestProduct(productId)),
    userProductRemove: (productId, userId) =>
      dispatch(userProductRemove(productId, userId)),
    guestProductRemove: productId => dispatch(guestProductRemove(productId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
