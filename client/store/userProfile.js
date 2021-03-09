import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SINGLE_USER_PROFILE = 'SINGLE_USER_PROFILE'

// ACTION CREATORS
const singleUserProfile = user => ({type: SINGLE_USER_PROFILE, user})

// THUNKS
export const getProfile = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${id}`)
    dispatch(singleUserProfile(data))
  } catch (err) {
    console.error(err)
  }
}

const defaultProfile = {}

// REDUCER
export default function(state = defaultProfile, action) {
  switch (action.type) {
    case SINGLE_USER_PROFILE:
      return action.user
    default:
      return state
  }
}
