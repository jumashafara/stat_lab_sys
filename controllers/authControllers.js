const User = require("../models/User")
const jwt = require('jsonwebtoken')
const { handle } = require("express/lib/application")
//test
const path = require('path')

const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email: '', password: ''}

    //incorrect email
    if(err.message === 'Incorrect email'){
        errors.email = 'that email is not registered'
    }

    //incorrect password
    if(err.message === 'Incorrect password'){
        errors.password = 'incorrect password'
    }

    //duplicate error
    if(err.code === 11000){
        errors.email = 'That email is already registerd'
        return errors
    }

    //validation errors
    if(err.message.includes('user validation failed')){
        //populate the errors object
        Object.values(err.errors).forEach(({properties}) => errors[properties.path] = properties.message)
    }
    return errors

}


//function to create tokens 
const max_age = 3*24*60*60
const createToken = (id) => jwt.sign({id}, 'chappie', {expiresIn: max_age})

//LOGIN SECTION
//controller for logging
module.exports.login_get = (req, res) => {
   res.render('login')
  
}

//controller for login post request
module.exports.login_post = async (req, res) => {
    const {name, email, password} = req.body

    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: max_age*1000})
        res.status(200).json({user: user._id, name: user.name})

    }catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
}

//SIGN UP SECTION
//controller for sign up get request 
module.exports.signup_get = (req, res) => {
    res.render('signup')
}

// controller for sign up post request
module.exports.signup_post = async (req, res) => {
    const {name, email, password} = req.body

    try {
        const user = await User.create({name, email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: max_age*1000})
        res.status(200).json({user: user._id})
    } 
    catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
    
}

