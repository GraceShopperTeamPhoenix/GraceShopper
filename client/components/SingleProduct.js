import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {fetchOneProduct} from '../store/singleProduct'
import {Link} from 'react-router-dom'
import {EditProduct} from './index'

export class SingleProduct extends React.Component {
  componentDidMount() {
    //this.props.getProducts()

    let id = this.props.match.params.id

    if (id) {
      this.props.getOneProduct(id)
    }
  }
  render() {
    console.log('Single Product', this.props)
    let id = this.props.match.params.id
    //const product = this.props.products.all[id - 1]
    const product = this.props.currentProduct
    if (!product) {
      return <div>No Product with this Id!</div>
    }
    return (
      <div>
        <div>
          <h1>{product.name}</h1>
          <img src={`/${product.imageUrl}`} width="200px" />
          <p>{product.description}</p>
          <p>$ {product.price / 100}</p>
          <p>{product.quantity} available</p>
          <button type="button">Add To Cart</button>
        </div>
        <div>
          {true && (
            <EditProduct product={product} history={this.props.history} />
          )}
        </div>
      </div>
    )
  }
}
const mapState = state => {
  return {
    products: state.products || [],
    currentProduct: state.product || {}
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    getOneProduct: id => dispatch(fetchOneProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
