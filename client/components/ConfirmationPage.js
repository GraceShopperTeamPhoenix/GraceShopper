import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store'
import {myOrder, emptyGuestCart, checkoutUserCart} from '../store/order'

class ConfirmationPage extends React.Component {
  constructor() {
    super()
    this.state = {
      receivedOrder: {}
    }
  }
  componentDidMount() {
    const receivedOrder = this.state.receivedOrder
    const order = this.props.order
    if (!this.props.user.guest) {
      this.props.loadInitialData()
      const id = this.props.user.id
      if (id) {
        this.props.getMyOrder(id)
      }
    } else if (
      this.props.user.guest &&
      order.status === 'pending' &&
      !receivedOrder.products
    ) {
      this.setState({
        receivedOrder: this.props.order
      })
      this.props.clearGuestCart()
    }
  }

  componentDidUpdate() {
    const id = this.props.user.id
    const order = this.props.order
    const receivedOrder = this.state.receivedOrder

    if (
      !this.props.user.guest &&
      order.status === 'pending' &&
      !receivedOrder.products
    ) {
      this.setState({
        receivedOrder: this.props.order
      })
      this.props.checkoutUserCart(id)
    }
  }

  render() {
    const {email} = this.props
    const order = this.state.receivedOrder || {products: []}
    if (order.products) {
      if (order.products.length > 0) {
        let cartTotal = 0
        return (
          <div className="confirmation-page">
            <h3>Your order is in!</h3>
            <div>A confirmation email has been sent to {email}</div>
            <br />
            <div>
              <h3>Here's what you ordered:</h3>
            </div>
            <div id="cart-container">
              <div>
                {order.products.map(item => {
                  let quantity =
                    this.props.user.id && item.order_product
                      ? item.order_product.quantity
                      : item.quantity
                  let itemTotal = item.price / 100 * quantity
                  cartTotal += itemTotal
                  return (
                    <div key={item.id} id="cart-product">
                      <div>
                        <img src={item.imageUrl} width="75px" />
                      </div>

                      <div>
                        <h2>{item.name}</h2>
                      </div>

                      <div>
                        <p>
                          Quantity: {quantity} @ ${item.price / 100}
                        </p>
                        <p>Item Total: ${itemTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div>
                <div>
                  <h1>Total: ${cartTotal.toFixed(2)}</h1>
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        return <h1>Please create an order.</h1>
      }
    } else {
      return <h1>Please create an order.</h1>
    }
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    user: state.user,
    order: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    getMyOrder(id) {
      dispatch(myOrder(id))
    },
    clearGuestCart() {
      dispatch(emptyGuestCart())
    },
    checkoutUserCart(id) {
      dispatch(checkoutUserCart(id))
    }
  }
}

export default connect(mapState, mapDispatch)(ConfirmationPage)
