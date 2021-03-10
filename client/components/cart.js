// import {check} from 'prettier'
import React from 'react'
import {connect} from 'react-redux'
import {
  myOrder,
  guestOrder,
  guestProduct,
  userProduct,
  userProductRemove,
  guestProductRemove,
  userProductDelete,
  guestProductDelete
} from '../store'
import CheckoutGuest from './CheckoutGuest'

export class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      guestCheckout: false
    }

    this.addClickHandler = this.addClickHandler.bind(this)
    this.removeClickHandler = this.removeClickHandler.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteClickHandler = this.deleteClickHandler.bind(this)
  }

  componentDidMount() {
    const id = this.props.user.id
    const order = this.props.order
    if (id && !order.id) {
      this.props.getMyOrder(id)
    } else if (id && order.userId !== id) {
      this.props.getMyOrder(id)
    } else if (!id) {
      // if no user is associated with state, get guest cart
      this.props.getGuestOrder()
    }
  }

  componentDidUpdate() {
    const id = this.props.user.id
    const order = this.props.order
    if (id && !order.id) {
      this.props.getMyOrder(id)
    }
  }

  addClickHandler(productId) {
    if (this.props.user.id) {
      this.props.userProduct(productId, this.props.user.id)
    } else {
      this.props.guestProduct(productId)
    }
  }

  removeClickHandler(productId) {
    if (this.props.user.id) {
      this.props.userProductRemove(productId, this.props.user.id)
    } else {
      this.props.guestProductRemove(productId)
    }
  }

  handleSubmit() {
    if (this.props.user.id) {
      //add thunk to update cart status 'pending' switch 'received'
      this.props.history.push('/confirmation')
    } else {
      this.setState({guestCheckout: true})
    }
  }

  deleteClickHandler(productId) {
    if (this.props.user.id) {
      this.props.userProductDelete(productId, this.props.user.id)
    } else {
      this.props.guestProductDelete(productId)
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
            <div className="pageHeader">
              <img src="/cartHeader.png" className="pageHeader" />
            </div>
            <div className="container">
              <div className="flexbox-container flex-item-two">
                {order.products.map(item => {
                  let quantity =
                    this.props.user.id && item.order_product
                      ? item.order_product.quantity
                      : item.quantity
                  let itemTotal = item.price / 100 * quantity
                  cartTotal += itemTotal
                  return (
                    <div key={item.id} className="flex-item">
                      <div>
                        <img src={item.imageUrl} id="prodImg" />
                      </div>

                      <div>
                        <h2>{item.name}</h2>
                      </div>

                      <div>
                        <p>Price: ${item.price / 100}</p>
                        <p>Item Total: ${itemTotal.toFixed(2)}</p>
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
                        <button
                          type="button"
                          onClick={() => this.deleteClickHandler(item.id)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex-item-three">
                <div>
                  <h1>Total: ${cartTotal.toFixed(2)}</h1>
                  <button type="submit" onClick={this.handleSubmit}>
                    Purchase
                  </button>
                </div>
                <div>
                  {this.state.guestCheckout && (
                    <CheckoutGuest history={this.props.history} />
                  )}
                </div>
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
    guestProductRemove: productId => dispatch(guestProductRemove(productId)),
    userProductDelete: (productId, userId) =>
      dispatch(userProductDelete(productId, userId)),
    guestProductDelete: productId => dispatch(guestProductDelete(productId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
