const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: Sequelize.DataTypes.ENUM({
    values: ['pending', 'received', 'shipped', 'arrived']
  }),
  total: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  paymentMethod: Sequelize.DataTypes.ENUM({
    values: ['visa', 'master', 'paypal']
  }),
  sessionId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
