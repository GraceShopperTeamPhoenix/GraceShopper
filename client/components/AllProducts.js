import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, filterProducts} from '../store/products'
import {Link} from 'react-router-dom'
import {AddToCart} from './index'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    console.log('props', props)
    this.state = {
      filter: 'All' || props.location.filter
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }
  componentDidMount() {
    this.props.getProducts()
    if (this.props.location.filter) {
      this.setState({filter: this.props.location.filter})
    }
  }

  handleSelectChange(evt) {
    this.setState({filter: evt.target.value})
  }
  render() {
    console.log(this.state.filter)
    const {filter} = this.state
    let products = this.props.products.all
    products = products.filter(product => {
      if (filter === 'All') return product
      if (filter === 'Succulents') return product.category === 'succulent'
      if (filter === 'Cacti') return product.category === 'cactus'
      if (filter === 'Aloe') return product.category === 'aloe'
    })
    if (products.length === 0) {
      return <div>No Products</div>
    } else {
      return (
        <div>
          <div className="pageHeader">
            <img src="/products.png" className="pageHeader" />
          </div>
          <span>Show: </span>
          <select onChange={this.handleSelectChange} value={filter}>
            <option value="All">All</option>
            <option value="Succulents">Succulents</option>
            <option value="Aloe">Aloe</option>
            <option value="Cacti">Cacti</option>
          </select>
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
    getProducts: () => dispatch(fetchProducts()),
    filterProducts: category => dispatch(filterProducts(category))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
