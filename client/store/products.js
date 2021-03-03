import Axios from 'axios'

//action types

const GET_PRODUCTS = 'GET_PRODUCTS'

//ACTION CREATOR

export const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

//thunk reducer

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data: products} = await Axios.get('/api/products')
      dispatch(getProducts(products))
    } catch (err) {
      console.log('Error Fetching Products')
    }
  }
}

//reducer

const initialState = {
  all: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {all: action.products}
    default:
      return state
  }
}
