import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const GET_CART_ITEMS = 'GET_CART_ITEMS'

/**
 * INITIAL STATE
 */
const defaultCart = {}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const getCartItems = cartId => ({type: GET_CART_ITEMS})

/**
 * THUNK CREATORS
 */
export const myCart = id => async dispatch => {
  console.log('in cart thunk')
  try {
    const res = await axios.get(`/api/cart/${id}`)
    console.log('got cart from axios: ', res.data)
    dispatch(getCart(res.data || defaultCart))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
