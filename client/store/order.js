import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const GET_GUEST_ORDER = 'GET_GUEST_ORDER'
const CREATED_GUEST_ORDER = 'CREATED_GUEST_ORDER'

/**
 * INITIAL STATE
 */
const defaultOrder = {}

/**
 * ACTION CREATORS
 */
const getOrder = order => ({type: GET_ORDER, order})
const getGuestOrder = order => ({type: GET_GUEST_ORDER, order})
const createdGuestOrder = order => ({type: CREATED_GUEST_ORDER, order})

/**
 * THUNK CREATORS
 */
export const myOrder = id => async dispatch => {
  try {
    const res = await axios.get(`/api/order/${id}`)
    dispatch(getOrder(res.data || defaultOrder))
  } catch (err) {
    console.error(err)
  }
}

export const newOrder = () => async dispatch => {
  console.log('in newGuestOrder thunk')
  try {
    const res = await axios.post(`/api/order/`)
    console.log('new guest order from axios, id is: ', res.data.id)
    dispatch(createdGuestOrder(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const guestOrder = () => async dispatch => {
  console.log('in guestOrder thunk')
  try {
    const res = await axios.get(`/api/order/`)
    console.log('got guest order from axios: ', res.data)
    dispatch(getGuestOrder(res.data))
  } catch (err) {
    console.error(err)
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
    case CREATED_GUEST_ORDER:
      return action.order
    default:
      return state
  }
}
