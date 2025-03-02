const express = require('express');
const router = express.Router();
const User = require('../models/user')

async function handleUserSignUp(req,res){
    const {fullName, email, password} = req.body;
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect("/")
}

router

module.exports = router;