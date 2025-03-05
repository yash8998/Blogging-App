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

//add blog
router.get('/addBlog', async(req,res) => {
    return res.render('addBlog');
})


module.exports = router;