const router = require('express').Router()
// const {Cart} = require('../db/models')
// const {CartItem} = require('../db/models')
const {Cart, CartItem, Product} = require('../db/models')

module.exports = router

router.get('/guest', async (req, res, next) => {
  console.log('in get guest cart route')
  console.log('req.session', req.session)
  console.log('req.passport', req.passport)
  // const id = 10
  try {
    const id = req.session.guestCartId
    if (id) {
      const cart = await Cart.findOne({
        include: [
          {
            model: CartItem,
            include: Product
          }
        ],
        where: {
          id: id,
          isActive: true
        }
      })
      res.json(cart)
    } else {
      const newCart = await Cart.create({isActive: true})
      req.session.guestCartId = newCart.id
      res.json(newCart)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      // include: CartItem,
      include: [
        {
          model: CartItem,
          include: Product
        }
      ],
      where: {
        userId: req.params.id,
        isActive: true
      }
    })
    console.log('RES:', res)
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

// router.post('/', async (req, res, next) => {
//   const newCart = await Cart.create({isActive: true})
//   req.session.cartId = newCart.id
//   res.json(newCart)
// })
