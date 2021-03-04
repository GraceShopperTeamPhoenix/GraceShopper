import React from 'react'
import {editProductThunk, fetchProducts} from '../store/products'
import {fetchOneProduct} from '../store/singleProduct'
import {connect} from 'react-redux'

class EditProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      price: '',
      quantity: '',
      category: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log('edit product component mounted')
    this.props.getProducts()
    let id = this.props.match.params.id
    if (id) {
      this.props.getOneProduct(id)
    }
  }

  componentDidUpdate() {}

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const id = this.props.match.params.id
    const formInput = {...this.state}
    Object.keys(formInput).forEach(key => {
      if (formInput[key] === '' || null) delete formInput[key]
    })
    this.props.editProduct(formInput, id)
    this.setState({
      name: '',
      description: '',
      price: '',
      quantity: '',
      category: ''
    })
  }

  render() {
    if (this.props.currentProduct) {
      const product = this.props.currentProduct
      return (
        <div>
          <div>
            <h4>Edit Product #{this.props.match.params.id}</h4>
          </div>
          <div>
            <p>Name: {product.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price / 100}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Category: {product.category}</p>
          </div>
          <div>
            <form id="edit-product-form" onSubmit={this.handleSubmit}>
              <label>Product Name:</label>{' '}
              <input
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <br />
              <label>Description:</label>{' '}
              <input
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
              <br />
              <label>Price:</label>{' '}
              <input
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
              <br />
              <label>Quantity:</label>{' '}
              <input
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
              <br />
              <label>Category:</label>{' '}
              <input
                name="category"
                value={this.state.category}
                onChange={this.handleChange}
              />
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )
    } else {
      return <h2>No Product Found</h2>
    }
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
    editProduct: (product, id) => dispatch(editProductThunk(product, id)),
    getProducts: () => dispatch(fetchProducts()),
    getOneProduct: id => dispatch(fetchOneProduct(id))
  }
}

export default connect(mapState, mapDispatch)(EditProduct)
