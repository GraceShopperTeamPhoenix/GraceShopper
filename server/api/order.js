const router = require('express').Router()
// const {Cart} = require('../db/models')
// const {CartItem} = require('../db/models')
const {Order, Order_Product, Product, User} = require('../db/models')

module.exports = router

//GET route ('/api/order/') to display GUEST cart
router.get('/', (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = {
      products: [],
      status: 'pending'
    }
    res.json(req.session.cart)
  } else {
    res.json(req.session.cart)
  }
})

//GET route ('api/order/:id') to display logged in user's cart
router.get('/:id', async (req, res, next) => {
  try {
    console.log('req.session', req.session, 0)
    const cart = await Order.findOrCreate({
      // include: CartItem,
      include: [
        {
          model: Product
        }
      ],
      where: {
        userId: req.params.id,
        status: 'pending'
      },
      defaults: {
        userId: req.params.id,
        status: 'pending'
      }
    })
    res.json(cart[0])
  } catch (err) {
    next(err)
  }
})

//POST route ('api/order/:productId') to add items to the cart for a GUEST
router.post('/:productId', async (req, res, next) => {
  try {
    if (!req.session.cart) {
      req.session.cart = {
        products: [],
        status: 'pending'
      }
    }
    const products = req.session.cart.products
    let item = products.find(
      product => product.id === Number(req.params.productId)
    )
    console.log('req.params.productId', req.params.productId)
    console.log('item', item)
    if (item) {
      item.quantity++
    } else {
      const product = await Product.findOne({where: {id: req.params.productId}})
      products.push({
        id: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        imageUrl: product.imageUrl
      })
    }
    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

//POST route to add items to the cart for a user

//DELETE route to remove items

//PUT route to edit quantity of items

//PUT route to edit status of cart to 'received' (checkout)

//if this is your first time here, set up a cart;
