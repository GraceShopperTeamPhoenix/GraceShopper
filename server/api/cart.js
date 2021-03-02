const router = require('express').Router()
const {Cart} = require('../db/models')
const {CartItem} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      include: CartItem,
      where: {
        userId: req.params.id,
        isActive: true
      }
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
