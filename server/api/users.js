const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

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

router.get('/', authorize, async (req, res, next) => {
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
