const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  userId: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: true
  },
  sessionId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true
  },
  isActive: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Cart
