import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const GET_GUEST_ORDER = 'GET_GUEST_ORDER'
const ADD_GUEST_PRODUCT = 'ADD_GUEST_PRODUCT'
const ADD_USER_PRODUCT = 'ADD_USER_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultOrder = {}

/**
 * ACTION CREATORS
 */
const getOrder = order => ({type: GET_ORDER, order})
const getGuestOrder = order => ({type: GET_GUEST_ORDER, order})
const addGuestProduct = order => ({type: ADD_GUEST_PRODUCT, order})
const addUserProduct = order => ({type: ADD_USER_PRODUCT, order})

/**
 * THUNK CREATORS
 */

// Gets user cart
export const myOrder = id => async dispatch => {
  try {
    console.log('IN GETMYORDER THUNK')
    const res = await axios.get(`/api/order/${id}`)
    dispatch(getOrder(res.data || defaultOrder))
  } catch (err) {
    console.error(err)
  }
}

// Gets guest cart
export const guestOrder = () => async dispatch => {
  try {
    const res = await axios.get(`/api/order/`)
    dispatch(getGuestOrder(res.data))
  } catch (err) {
    console.error(err)
  }
}

// Adds product to guest cart
export const guestProduct = productId => async dispatch => {
  try {
    const {data} = await axios.post(`/api/order/${productId}`)
    dispatch(addGuestProduct(data))
  } catch (error) {
    console.log('Error adding product', error)
  }
}

// Adds product to user cart
export const userProduct = (productId, userId) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/order/${userId}/${productId}`)
    dispatch(addUserProduct(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultOrder, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case GET_GUEST_ORDER:
      return action.order
    case ADD_GUEST_PRODUCT:
      return action.order
    case ADD_USER_PRODUCT:
      return action.order
    default:
      return state
  }
}
