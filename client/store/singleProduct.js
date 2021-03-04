import Axios from 'axios'

//action types

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//ACTION CREATOR

export const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

//thunk reducer

export const fetchOneProduct = id => {
  console.log('in single product thunk')
  console.log('id = ', id)
  return async dispatch => {
    try {
      console.log('about to get product')
      const {data: product} = await Axios.get(`/api/products/${id}`)
      console.log('got single product: ', product)
      dispatch(getSingleProduct(product))
    } catch (error) {
      console.log('Error Fetching Single Product')
    }
  }
}

//reducer

const initialState = {
  currentProduct: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
