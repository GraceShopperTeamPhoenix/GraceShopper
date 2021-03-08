const router = require('express').Router()
// const {Cart} = require('../db/models')
// const {CartItem} = require('../db/models')
const {Order, Order_Product, Product, User} = require('../db/models')
module.exports = router

//authorization function for user
async function authorize(req, res, next) {
  try {
    let user
    if (req.session.passport) {
      user = await User.findOne({where: {id: req.session.passport.user}})
    }
    if (user.id !== Number(req.params.id) && !user.isAdmin) {
      return res
        .status(403)
        .send({error: {status: 403, message: 'Access denied.'}})
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

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
router.get('/:id', authorize, async (req, res, next) => {
  try {
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
router.post('/:userId/:productId', authorize, async (req, res, next) => {
  const cart = await Order.findOrCreate({
    include: [
      {
        model: Product
      }
    ],
    where: {
      userId: req.params.userId,
      status: 'pending'
    },
    defaults: {
      userId: req.params.userId,
      status: 'pending'
    }
  })
  const products = cart[0].products
  let item = products.find(
    product => product.id === Number(req.params.productId)
  )
  if (item) {
    await cart[0].addProduct(item, {
      through: {
        quantity: (item.order_product.quantity += 1),
        price: item.price
      }
    })
    const updatedCart = await Order.findOne({
      include: [
        {
          model: Product
        }
      ],
      where: {
        id: cart[0].id
      }
    })
    res.json(updatedCart)
  } else {
    const product = await Product.findOne({where: {id: req.params.productId}})
    await cart[0].addProduct(product, {
      through: {quantity: 1, price: product.price}
    })
    const updatedCart = await Order.findOne({
      include: [
        {
          model: Product
        }
      ],
      where: {
        id: cart[0].id
      }
    })
    res.json(updatedCart)
  }
})

//PUT route ('api/order/:productId') to decrement quantity of items for GUEST
router.put('/:productId', async (req, res, next) => {
  try {
    let products = req.session.cart.products
    let item = products.find(
      product => product.id === Number(req.params.productId)
    )
    if (item.quantity > 1) {
      item.quantity--
    } else {
      req.session.cart.products = products.filter(
        item => item.id !== Number(req.params.productId)
      )
    }
    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

//PUT route ('api/order/:userId/:productId') to decrement quantity of items for USER
router.put('/:userId/:productId', authorize, async (req, res, next) => {
  let cart = await Order.findOne({
    include: [
      {
        model: Product
      }
    ],
    where: {
      userId: req.params.userId,
      status: 'pending'
    }
  })

  let products = cart.products
  let item = products.find(
    product => product.id === Number(req.params.productId)
  )

  if (item.order_product.quantity > 1) {
    await cart.addProduct(item, {
      through: {
        quantity: (item.order_product.quantity -= 1),
        price: item.price
      }
    })
  } else {
    await cart.removeProduct(item)
  }
  const updatedCart = await Order.findOne({
    include: [
      {
        model: Product
      }
    ],
    where: {
      id: cart.id
    }
  })
  res.json(updatedCart)
})

//DELETE route to remove an item from a guest cart
router.delete('/:productId', async (req, res, next) => {
  try {
    let products = req.session.cart.products
    req.session.cart.products = products.filter(
      item => item.id !== Number(req.params.productId)
    )
    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

//DELETE route to remove an item from a logged in users cart

router.delete('/:userId/:productId', authorize, async (req, res, next) => {
  try {
    let cart = await Order.findOne({
      include: [
        {
          model: Product
        }
      ],
      where: {
        userId: req.params.userId,
        status: 'pending'
      }
    })

    let products = cart.products
    let item = products.find(
      product => product.id === Number(req.params.productId)
    )
    await cart.removeProduct(item)
    const updatedCart = await Order.findOne({
      include: [
        {
          model: Product
        }
      ],
      where: {
        id: cart.id
      }
    })
    res.json(updatedCart)
  } catch (error) {
    next(error)
  }
})
