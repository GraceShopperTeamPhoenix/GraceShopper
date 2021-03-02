const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: Sequelize.DataTypes.ENUM({
    values: ['received', 'shipped', 'arrived']
  }),

  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },

  total: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0.0
    }
  },

  paymentMethod: Sequelize.DataTypes.ENUM({
    values: ['visa', 'master', 'paypal']
  })
})

module.exports = Order
