import React from 'react'
import {connect} from 'react-redux'
import {myOrder, guestOrder} from '../store'

export class Cart extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log('CART COMPONENT MOUNTED')
    console.log('PROPS =>', this.props)
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
    console.log('CART COMPONENT UPDATED')
    const id = this.props.user.id
    const order = this.props.order
    if (id && !order.id) {
      this.props.getMyOrder(id)
    }
  }

  render() {
    const styles = {
      cartproduct: {
        display: 'flex',
        alignItems: 'center',
        margin: '10px',
        padding: '5px',
        border: '1px gray solid'
        // background: 'lightgray',
      },
      cartcontainer: {
        width: '75%',
        display: 'flex',
        justifyContent: 'center'
      },
      totals: {
        width: '25%'
      },
      total: {
        // border: '1px gray solid',
        background: 'gainsboro',
        margin: '10px',
        padding: '5px'
      }
    }
    const user = this.props.user
    const order = this.props.order

    console.log(order)
    if (user.id && order.id) {
      let cartTotal = 0
      return (
        <div>
          <h1>My Cart</h1>
          <div id="cart-container" style={styles.cartcontainer}>
            <div>
              {order.products.map(item => {
                let itemTotal = item.price / 100 * item.quantity
                cartTotal += itemTotal
                console.log('cart total: ', cartTotal)
                return (
                  <div
                    key={item.id}
                    id="cart-product"
                    style={styles.cartproduct}
                  >
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
                        Quantity: {item.quantity}
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
            <div style={styles.totals}>
              <div style={styles.total}>
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
