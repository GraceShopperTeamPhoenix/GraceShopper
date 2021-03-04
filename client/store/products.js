import Axios from 'axios'
import history from '../history'

//action types

const GET_PRODUCTS = 'GET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

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

const deleteProduct = id => ({type: DELETE_PRODUCT, deletedProduct})

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
    } catch (error) {
      console.log('error updating product', error)
    }
  }
}

export const deleteProductThunk = id => {
  return async dispatch => {
    try {
      const deletedProduct = await Axios.delete(`/api/products/${id}`)
      console.log(deletedProduct)
      dispatch(deleteProduct(deletedProduct))
      history.push(`/products/`)
    } catch (error) {
      console.log('error deleting product', error)
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
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.deletedProduct.id)
    default:
      return state
  }
}
