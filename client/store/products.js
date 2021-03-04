import Axios from 'axios'
import history from '../history'

//action types

const GET_PRODUCTS = 'GET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

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

export const editProduct = product => {
  return {
    type: EDIT_PRODUCT,
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

export const editProductThunk = (product, id) => {
  return async dispatch => {
    try {
      const updated = (await Axios.put(`/api/products/${id}`, product)).data
      dispatch(editProduct(updated))
      history.push(`/products/${id}`)
    } catch (error) {
      console.log('error updating product', error)
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
    case EDIT_PRODUCT:
      return {...state, all: [...state.all, action.product]}
    default:
      return state
  }
}
