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
    try{
        const token = await User.matchPassAndGenToken(email,password)
        //console.log('Token',token)
        return res.cookie('token', token).redirect("/")
    }
    catch(error){
        return res.render('signin',{
            error: 'Incorrect email or password'
        })
    } 
}

function handleUserLogout(req, res){
    res.clearCookie('token').redirect('/')
}


module.exports = {
    handleUserSignUp,
    handleUserSignin,
    handleUserLogout,
};