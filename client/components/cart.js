import React from 'react'
import {connect} from 'react-redux'
import {myOrder, guestOrder} from '../store'

export class Cart extends React.Component {
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

  //if there is no order, create a new order (line 19)

  componentDidUpdate() {
    console.log('CART COMPONENT UPDATED')
    const id = this.props.user.id
    const order = this.props.order
    if (id && !order.id) {
      console.log('USER ID YES - ORDER ID NO')
      this.props.getMyOrder(id)
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
                          <button>-</button>
                          Quantity: {quantity}
                          <button>+</button>
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
                  <h1>Total: ${cartTotal}</h1>
                  <button>Purchase</button>
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
    getGuestOrder: () => dispatch(guestOrder())
  }
}

export default connect(mapState, mapDispatch)(Cart)
