const router = require('express').Router()
const {Product} = require('../db/models')
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    console.log(err)
  }
})

async function authorize(req, res, next) {
  try {
    let user
    if (req.session.passport) {
      user = await User.findOne({where: {id: req.session.passport.user}})
    }
    if (!user || !user.isAdmin) {
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

//POST route ('/api/products') for CREATING a new item - admins only!
router.post('/', authorize, async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body))
  } catch (error) {
    next(error)
  }
})
