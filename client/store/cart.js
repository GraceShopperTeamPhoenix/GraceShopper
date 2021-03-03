import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const GET_GUEST_CART = 'GET_GUEST_CART'
const CREATED_GUEST_CART = 'CREATED_GUEST_CART'

/**
 * INITIAL STATE
 */
const defaultCart = {}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const getGuestCart = cart => ({type: GET_GUEST_CART, cart})
const createdGuestCart = cart => ({type: CREATED_GUEST_CART, cart})

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

export const newGuestCart = () => async dispatch => {
  console.log('in newGuestCart thunk')
  try {
    const res = await axios.post(`/api/cart/`)
    console.log('new guest cart from axios, id is: ', res.data.id)
    dispatch(createdGuestCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const guestCart = id => async dispatch => {
  console.log('in cart thunk')
  try {
    const res = await axios.get(`/api/cart//guest/${id}`)
    console.log('got guest cart from axios: ', res.data)
    dispatch(getGuestCart(res.data))
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
    case GET_GUEST_CART:
      return action.cart
    case CREATED_GUEST_CART:
      return action.cart
    default:
      return state
  }
}
