const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cartId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = CartItem
