import axios from 'axios'

//ACTION TYPES
const GET_USERS = 'GET_USERS'

//ACTION CREATORS
//get all users
const getUsers = users => {
  return {
    type: GET_USERS,
    users
  }
}

//THUNK CREATORS
export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(getUsers(data))
    } catch (error) {
      console.log('error fetching users', error)
    }
  }
}

//initialState
const initialState = {
  all: []
}

//REDUCER
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {...state, all: action.users}
    default:
      return state
  }
}
