const router = require('express').Router()
// const {Cart} = require('../db/models')
// const {CartItem} = require('../db/models')
const {Cart, CartItem, Product} = require('../db/models')

module.exports = router

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
