const {green, red} = require('chalk')
const faker = require('faker')

const db = require('../server/db')
const User = require('../server/db/models/user')
const Product = require('../server/db/models/products')
const Order = require('../server/db/models/order')
const Order_Product = require('../server/db/models/order_product')

// ---- seeding User ----------
let user_build = []

const normalUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.state()},${faker.address.zipCode()}`,
  email: 'user@graceshopper.com',
  password: '12345',
  isAdmin: false
}

const adminUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.state()},${faker.address.zipCode()}`,
  email: 'admin@graceshopper.com',
  password: '12345',
  isAdmin: true
}
user_build.push(normalUser)
user_build.push(adminUser)

for (let i = 0; i <= 110; i++) {
  let user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.state()},${faker.address.zipCode()}`,
    email: `${faker.name.firstName()}_${faker.name.lastName()}@${faker.internet.domainName()}`,
    password: '12345',
    isAdmin: false
  }
  user_build.push(user)
}

const users = user_build

// ---- seeding Product----------
let Product_build = []

const name1 = [
  'Asclepias',
  'Caladium',
  'Canna',
  'Dianthus',
  'Cuphea',
  'Catharanthus',
  'Ageratum',
  'Geranium',
  'Brassica',
  'Phlox',
  'Celosia'
]
const name2 = [
  'generalis',
  'ignea',
  'millefolium',
  'elegans',
  'speciosa',
  'cristata',
  'cineraria',
  'australis',
  'aemula',
  'tuberosa',
  'amabilis'
]

for (let i = 0; i <= 110; i++) {
  let Product = {
    name:
      name1[Math.floor(Math.random() * 11)] +
      ' ' +
      name2[Math.floor(Math.random() * 11)],
    description: faker.lorem.text(),
    imageUrl: '/succulent.jpg',
    price: 123,
    quantity: Math.ceil(Math.random() * 25),
    category: 'plants'
  }
  Product_build.push(Product)
}
const products = Product_build

// ---- seeding Orders----------
let Order_build = []

for (let i = 1; i <= 10; i++) {
  let Order = {
    userId: i,
    status: 'pending',
    total: 50000
  }
  Order_build.push(Order)
}

const orders = Order_build

// ----- seeding Order_Product -------
let Order_Product_build = []

for (let i = 1; i <= 50; i++) {
  let Order_Product = {
    orderId: Math.ceil(Math.random() * 10),
    productId: Math.ceil(Math.random() * 100),
    quantity: Math.ceil(Math.random() * 5),
    price: 1000
  }
  Order_Product_build.push(Order_Product)
}

const order_products = Order_Product_build

const seed = async () => {
  try {
    await db.sync({force: true})

    // seed your database here!
    await User.bulkCreate(users)
    await Product.bulkCreate(products)
    await Order.bulkCreate(orders)
    await Order_Product.bulkCreate(order_products)
    console.log(green('Seeding success!'))
    db.close()
  } catch (err) {
    console.log(red(err))
    db.close()
  }
}

module.exports = seed

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}

// ---- seeding Orders----------

// let Order_build = []

// for (let i = 0; i <= 110; i++) {
//     let Order = {
//         firstName: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//         address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.state()},${faker.address.zipCode()}`,
//         email: `${this.firstName}_${this.lastName}@${faker.internet.domainName()}`,
//     }
//     Order_build.push(Order)
// }

// const Order = Order_build
