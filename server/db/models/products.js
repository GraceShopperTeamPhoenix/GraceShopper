const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://placebear.com/640/360',
    validation: {
      isUrl: true
    }
  },
  price: {
    type: Sequelize.DECIMAL,
    validation: {
      min: 0.01
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    validation: {
      min: 0
    }
  },
  category: {
    type: Sequelize.STRING
    //type:Sequelize.ARRAY lets us create a drop down to sort or .ENUM
  }
})
module.exports = Product
