const {green, red} = require('chalk')
const faker = require('faker')

const {db} = require('../server/db')
const User = require('./server/db/user')
const Product = require('./server/db/product')
const Cart = require('./server/db/cart')
const Cartitem = require('./server/db/cartitem')
const Order = require('./server/db/order')

// ---- seeding User ----------
let user_build = []

for (let i = 0; i <= 110; i++) {
  let user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.state()},${faker.address.zipCode()}`,
    email: `${this.firstName}_${this.lastName}@${faker.internet.domainName()}`,
    password: '12345',
    isAdmin: false
  }
  user_build.push(user)
}

const adminUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: `${faker.address.streetAddress()},${faker.address.city()},${faker.address.state()},${faker.address.zipCode()}`,
  email: 'admin@graceshopper.com',
  password: '12345',
  isAdmin: true
}
user_build.push(adminUser)

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
    imageUrl: 'public/succulent.jpg',
    price: faker.commerce.price(),
    quantity: Math.ceil(Math.random() * 25),
    category: 'plants'
  }
  Product_build.push(Product)
}
const products = Product_build

// ---- seeding Carts----------
let Cart_build = []

for (let i = 1; i <= 10; i++) {
  let Cart = {
    userId: i,
    isActive: true
  }
  Cart_build.push(Cart)
}

const carts = Cart_build

// ---- seeding Cartitem----------
let Cartitem_build = []

for (let i = 1; i <= 50; i++) {
  let Cartitem = {
    CartId: Math.ceil(Math.random() * 10),
    productId: Math.ceil(Math.random() * 100),
    quantity: Math.ceil(Math.random() * 5)
  }
  Cartitem_build.push(Cartitem)
}

const cartitems = Cartitem_build

const seed = async () => {
  try {
    await db.sync({force: true})

    // seed your database here!
    await User.bulkCreate(users)
    await Product.bulkCreate(products)
    await Cart.bulkCreate(carts)
    await Cartitem.bulkCreate(cartitems)
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
