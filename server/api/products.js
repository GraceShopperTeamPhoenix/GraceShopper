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

//PUT route ('/api/products/id') for UPDATING a new item - admins only!
router.put('/:id', authorize, async (req, res, next) => {
  try {
    const itemToUpdate = await Product.findByPk(req.params.id)
    const updatedItem = await itemToUpdate.update(req.body)
    res.status(200).send(updatedItem)
  } catch (error) {
    next(error)
  }
})

//DELETE route ('/api/products/id') for DELETING a new item - admins only!
router.delete('/:id', async (req, res, next) => {
  try {
    const itemToDelete = await Product.findByPk(req.params.id)
    await itemToDelete.destroy()
    res.status(200).send(itemToDelete)
  } catch (error) {
    next(error)
  }
})

//POST route ('/api/products') for CREATING a new item - admins only!
router.post('/', authorize, async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body))
  } catch (error) {
    next(error)
  }
})
