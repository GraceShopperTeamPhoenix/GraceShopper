const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'address', 'firstName', 'lastName', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {firstName, lastName, address, email, password} = req.body
    let user = await User.create({
      firstName,
      lastName,
      address,
      email,
      password
    })
    user = await user.reload()
    //get the up-to-date data from the database
    res.json(user)
  } catch (error) {
    next(error)
  }
})
