import React from 'react'
import {createProductThunk} from '../store/products'
import {connect} from 'react-redux'

class AddProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      price: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.createProduct({...this.state})
    this.setState({
      name: '',
      description: '',
      price: ''
    })
  }

  render() {
    return (
      <div>
        <form id="add-product-form" onSubmit={this.handleSubmit}>
          <h4>Add a Product</h4>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    createProduct: product => dispatch(createProductThunk(product))
  }
}

export default connect(null, mapDispatch)(AddProduct)
