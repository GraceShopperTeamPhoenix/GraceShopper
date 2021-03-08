import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {Link} from 'react-router-dom'
import {AddToCart} from './index'

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
          <div className="pageHeader">
            <img src="/products.png" className="pageHeader" />
          </div>
          <div className="flexbox-container">
            {products.map(product => (
              <div key={product.id} className="flex-item">
                <Link to={`/products/${product.id}`}>{product.name}</Link>
                <br />
                <img src={product.imageUrl} id="prodImg" />
                <p>$ {product.price / 100}</p>
                <AddToCart productId={product.id} />
              </div>
            ))}
          </div>
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
