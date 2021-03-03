import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    console.log('Single Product', this.props)
    let id = this.props.match.params.id
    const product = this.props.products.all[id - 1]
    if (!product) {
      return <div>No Product with this Id!</div>
    }
    return (
      <div>
        <h1>{product.name}</h1>
        <img src="/succulent.jpg" width="200px" />
        <p>{product.description}</p>
        <p>{product.price}$</p>
        <p>{product.quantity} available</p>
        <button type="button">Add To Cart</button>
      </div>
    )
  }
}
const mapState = state => {
  return {
    products: state.products || []
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
