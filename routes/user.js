const { Router } = require('express')

const router = Router()

const {handleUserSignUp, handleUserSignin, handleUserLogout} = require('../controllers/user')

// Signup
router.post('/signup',handleUserSignUp)

// Signin
router.post('/signin', handleUserSignin)

// Logout
router.get('/logout',handleUserLogout)

module.exports = router