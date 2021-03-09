const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
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

// GET route (/api/users/:userId) to get single User and their orders
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: [
        'id',
        'email',
        'address',
        'firstName',
        'lastName',
        'isAdmin'
      ],
      where: {
        id: req.params.userId
      },
      include: {
        model: Order,
        include: {
          model: Product
        },
        where: {
          status: 'received'
        },
        required: false,
        right: true
      }
    })
    res.json(user)
  } catch (err) {
    console.error('Error getting single user: ', err)
  }
})

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
