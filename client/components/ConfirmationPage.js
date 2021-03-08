import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store'
import user from '../store/user'
import {myOrder, emptyGuestCart} from '../store/order'

class ConfirmationPage extends React.Component {
  componentDidMount() {
    if (!this.props.user.guest) {
      this.props.loadInitialData()
      const id = this.props.user.id
      if (id) {
        this.props.getMyOrder(id)
      }
    }
  }

  componentDidUpdate() {
    const id = this.props.user.id
    const order = this.props.order
    if (!this.props.user.guest) {
      if (id && !order.id) {
        this.props.getMyOrder(id)
      }
    } else if (order.id) {
      this.props.clearGuestCart()
    }
  }

  render() {
    const {email} = this.props
    const order = this.props.order || {products: []}
    if (order.products) {
      if (order.products.length > 0) {
        let cartTotal = 0
        return (
          <div>
            <div>
              <h3>Your order is in!</h3>
              <div>A confirmation email has been sent to {email}</div>
              <br />
              <div>
                <h3>Here's what you ordered:</h3>
              </div>
              <div id="cart-container">
                <div>
                  {order.products.map(item => {
                    let itemTotal = item.price / 100 * item.quantity
                    cartTotal += itemTotal
                    console.log('cart total: ', cartTotal)
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
                            Quantity: {item.quantity} @ ${item.price / 100}
                          </p>
                          <p>Item Total: ${itemTotal}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div>
                  <div>
                    <h1>Total: ${cartTotal}</h1>
                  </div>
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
    }
  }
}

export default connect(mapState, mapDispatch)(ConfirmationPage)
