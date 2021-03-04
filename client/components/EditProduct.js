import React from 'react'
import {editProductThunk, fetchProducts} from '../store/products'
import {connect} from 'react-redux'

class EditProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.products.all[this.props.match.params.id],
      description: '',
      price: '',
      quantity: '',
      category: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.editProduct({...this.state}, this.props.match.params.id)
    this.setState({
      name: '',
      description: '',
      price: '',
      quantity: '',
      category: ''
    })
  }

  render() {
    return (
      <div>
        <form id="edit-product-form" onSubmit={this.handleSubmit}>
          <h4>Edit Product #{this.props.match.params.id}</h4>
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
    editProduct: (product, id) => dispatch(editProductThunk(product, id)),
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(EditProduct)
