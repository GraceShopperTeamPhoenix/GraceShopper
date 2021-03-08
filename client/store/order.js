import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const GET_GUEST_ORDER = 'GET_GUEST_ORDER'
const ADD_GUEST_PRODUCT = 'ADD_GUEST_PRODUCT'
const ADD_USER_PRODUCT = 'ADD_USER_PRODUCT'
const REMOVE_GUEST_PRODUCT = 'REMOVE_GUEST_PRODUCT'
const REMOVE_USER_PRODUCT = 'REMOVE_USER_PRODUCT'
const CLEAR_GUEST_CART = 'CLEAR_CART'
const DELETE_GUEST_PRODUCT = 'DELETE_GUEST_PRODUCT'
const DELETE_USER_PRODUCT = 'DELETE_USER_PRODUCT'
const CLEAR_USER_CART = 'CLEAR_USER_CART'

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
const removeGuestProduct = order => ({type: REMOVE_GUEST_PRODUCT, order})
const removeUserProduct = order => ({type: REMOVE_USER_PRODUCT, order})
const clearGuestCart = () => ({type: CLEAR_GUEST_CART})
const deleteGuestProduct = order => ({type: DELETE_GUEST_PRODUCT, order})
const deleteUserProduct = order => ({type: DELETE_USER_PRODUCT, order})
const clearUserCart = () => ({type: CLEAR_USER_CART})

/**
 * THUNK CREATORS
 */

// Gets user cart
export const myOrder = id => async dispatch => {
  try {
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

//decrement product from guest cart
export const guestProductRemove = productId => async dispatch => {
  try {
    const {data} = await axios.put(`/api/order/${productId}`)
    dispatch(removeGuestProduct(data))
  } catch (error) {
    console.log('Error removing product', error)
  }
}

//decrement product from user cart
export const userProductRemove = (productId, userId) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/order/${userId}/${productId}`)
    dispatch(removeUserProduct(data))
  } catch (error) {
    console.log('Error removing product', error)
  }
}

// Clears guest cart
export const emptyGuestCart = () => async dispatch => {
  try {
    await axios.delete('/api/order/')
    dispatch(clearGuestCart())
  } catch (error) {
    console.error(error)
  }
}
//delete product from guest cart
export const guestProductDelete = productId => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/order/${productId}`)
    dispatch(deleteGuestProduct(data))
  } catch (error) {
    console.log('Error deleting product', error)
  }
}

//delete product from user cart

export const userProductDelete = (productId, userId) => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/order/${userId}/${productId}`)
    dispatch(deleteUserProduct(data))
  } catch (error) {
    console.log('Error deleting product', error)
  }
}

// checkout user cart
export const checkoutUserCart = userId => async dispatch => {
  try {
    await axios.put(`/api/order/received/${userId}`)
    dispatch(clearUserCart())
  } catch (error) {
    console.log('Error clearing user cart, ', error)
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
    case REMOVE_GUEST_PRODUCT:
      return action.order
    case REMOVE_USER_PRODUCT:
      return action.order
    case CLEAR_GUEST_CART:
      return defaultOrder
    case DELETE_USER_PRODUCT:
      return action.order
    case DELETE_GUEST_PRODUCT:
      return action.order
    case CLEAR_USER_CART:
      return defaultOrder
    default:
      return state
  }
}
