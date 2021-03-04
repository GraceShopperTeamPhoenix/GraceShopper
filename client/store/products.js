import Axios from 'axios'

//action types

const GET_PRODUCTS = 'GET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'

//ACTION CREATOR

export const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

export const createProduct = product => {
  return {
    type: CREATE_PRODUCT,
    product
  }
}

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

export const createProductThunk = product => {
  return async dispatch => {
    try {
      const created = (await Axios.post('/api/products', product)).data
      dispatch(createProduct(created))
    } catch (error) {
      console.log('error creating product', error)
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
    case CREATE_PRODUCT:
      return {...state, all: [...state.all, action.product]}
    default:
      return state
  }
}
