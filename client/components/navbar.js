import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <header role="banner">
      <img
        id="logo-main"
        src="/header3.png"
        width="200"
        alt="Logo Thing main logo"
      />
      <div className="navbar">
        {isLoggedIn ? (
          isAdmin ? (
            <div i wanna do liker>
              {/* The navbar will show these links after you log in as an Amin*/}
              <Link to="/home" id="link">
                Home
              </Link>
              <Link to="/users">Users</Link>
              <Link to="/products">Products</Link>
              <Link to="/cart" className="right">
                Cart
              </Link>
              <Link to="/addproduct">Add Product</Link>
              <Link to="/user">My Page</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/cart" className="right">
                Cart
              </Link>
              <Link to="/user">My Page</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          )
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/home" id="link">
              Home
            </Link>
            <Link to="/signup" className="right">
              Sign Up
            </Link>
            <Link to="/products">Products</Link>
            <Link to="/cart" className="right">
              Cart
            </Link>
            <Link to="/login" className="right">
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
