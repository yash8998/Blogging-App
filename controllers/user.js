const express = require('express');
const router = express.Router();
const User = require('../models/user')

async function handleUserSignUp(req,res){
    const {fullName, email, password} = req.body;
    //console.log('User creation started')
    await User.create({
        fullName,
        email,
        password
    })
    //console.log('User created')
    return res.redirect("/")
}


async function handleUserSignin(req,res){
    const {email, password} = req.body
    const user = await User.matchPassword(email,password)

    console.log('User',user)
    return res.redirect("/")
}


module.exports = {
    handleUserSignUp,
    handleUserSignin,
};