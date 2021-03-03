import React from 'react'
import {connect} from 'react-redux'
import {myCart} from '../store'
import {guestCart} from '../store'

export class Cart extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log('COMPONENT MOUNTED')
    console.log('PROPS =>', this.props)
    if (!this.props.user.id && this.props.cart.id) {
      console.log('user id not found')
      console.log('cart still associated')
    }
  }

  componentDidUpdate() {
    console.log('COMPONENT UPDATED')
    const id = this.props.user.id || 2
    if (this.props.user.id && !this.props.cart.id) {
      console.log('no cart')
      console.log('id is ', id)
      this.props.getMyCart(id)
    }
    if (!id && !this.props.cart.id) {
      getGuestCart()
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
    if (this.props.cart.id && this.props.cart.cartItems.length) {
      let cartTotal = 0
      return (
        <div>
          <h1>My Cart</h1>
          <div id="cart-container" style={styles.cartcontainer}>
            <div>
              {this.props.cart.cartItems.map(item => {
                let itemTotal = item.product.price * item.quantity
                cartTotal += itemTotal
                console.log('cart total: ', cartTotal)
                return (
                  <div
                    key={item.id}
                    id="cart-product"
                    style={styles.cartproduct}
                  >
                    <div>
                      <img src={item.product.imageUrl} width="75px" />
                    </div>

                    <div>
                      <h2>{item.product.name}</h2>
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
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getMyCart: id => dispatch(myCart(id)),
    getGuestCart: () => dispatch(guestCart())
  }
}

export default connect(mapState, mapDispatch)(Cart)
