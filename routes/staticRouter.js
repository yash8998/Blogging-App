const express = require('express');
const router = express.Router();

//Signin page
router.get('/signin', async(req,res) => {
    return res.render('signin');
});

//signup
router.get('/signup', async(req,res) => {
    return res.render('signup');
});

router.get('/signin', async(req,res) => {
    return res.render('signin');
})


module.exports = router;