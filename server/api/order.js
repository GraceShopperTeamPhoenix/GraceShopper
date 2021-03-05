const router = require('express').Router()
// const {Cart} = require('../db/models')
// const {CartItem} = require('../db/models')
const {Order, Order_Product, Product, User} = require('../db/models')

module.exports = router

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

//POST route to add items to the cart

//DELETE route to remove items

//PUT route to edit quantity of items

//PUT route to edit status of cart to 'received' (checkout)

//if this is your first time here, set up a cart;
