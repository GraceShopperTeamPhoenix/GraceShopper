import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'
import {AddProduct} from './index'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products.all
    if (products.length === 0) {
      return <div>No Products</div>
    } else {
      return (
        <div>
          <h1>Products</h1>
          {products.map(product => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
              <br />
              <img src={product.imageUrl} width="100px" />
              <p>$ {product.price / 100}</p>
              <button type="button">Add to Cart</button>
            </div>
          ))}
        </div>
      )
    }
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

export default connect(mapState, mapDispatch)(AllProducts)
