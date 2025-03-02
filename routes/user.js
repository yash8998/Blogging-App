const { Router } = require('express')

const router = Router()

const {handleUserSignUp, handleUserSignin} = require('../controllers/user')

// Signup
router.post('/signup',handleUserSignUp)

// Signin
router.post('/signin', handleUserSignin)

module.exports = router