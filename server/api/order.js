const router = require('express').Router()
// const {Cart} = require('../db/models')
// const {CartItem} = require('../db/models')
const {Order, Order_Product, Product, User} = require('../db/models')

module.exports = router

// //POST route to create the cart/order ('api/order')
// router.post('/', async (req, res, next) => {
//   try {
//     let user
//     let newCart
//     if (req.session.passport) {
//       user = await User.findOne({where: {id: req.session.passport.user}})
//     }
//     if (user) {
//       //if there is a userId, create a new Order with userId & status pending
//       newCart = await Order.create({
//         status: 'pending',
//         id: user.id,
//       })
//     } else {
//       //if there is no user, create a new Order with sessionId & status pending
//       newCart = await Order.create({
//         status: 'pending',
//         id: req.session.guestOrderId,
//       })
//     }
//     res.json(newCart)
//   } catch (error) {
//     next(error)
//   }
// })

//GET route ('api/order/guest') to display guest cart
router.get('/guest', async (req, res, next) => {
  // console.log('req.session', req.session)

  try {
    const id = req.session.guestOrderId
    if (id) {
      const cart = await Order.findOne({
        include: [
          {
            model: Product
          }
        ],
        where: {
          id: id,
          status: 'pending'
        }
      })
      res.json(cart)
      // } else {
      //   const newCart = await Order.create({
      //     status: 'pending',
      //     id: req.session.guestOrderId,
      //   })
      //   res.json(newCart)
    }
  } catch (err) {
    next(err)
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
