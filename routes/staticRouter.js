const express = require('express');
const router = express.Router();

//Signin page
router.get('/signin', async(req,res) => {
    return res.render('signin');
});

//Login
router.get('/signup', async(req,res) => {
    return res.render('signup');
});


module.exports = router;