import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {fetchOneProduct} from '../store/singleProduct'
import {EditProduct, AddToCart} from './index'

export class SingleProduct extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id
    if (id) {
      this.props.getOneProduct(id)
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.currentProduct.updatedAt !== prevProps.currentProduct.updatedAt
    ) {
      let id = this.props.currentProduct.id
      this.props.getOneProduct(id)
    }
  }
  render() {
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
          <AddToCart productId={product.id} />
        </div>
        <div>
          {this.props.isAdmin && (
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
    currentProduct: state.product || {},
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    getOneProduct: id => dispatch(fetchOneProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
