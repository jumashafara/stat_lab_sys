const User = require("../models/User")
const jwt = require('jsonwebtoken')
const { handle } = require("express/lib/application")
//test
const path = require('path')
const Computer = require("../models/Computer")

const handleErrors = (err) => {
    console.log(err.message, err.code)

    let user_errors = {email: '', password: ''}

    //incorrect email
    if(err.message === 'Incorrect email'){
        user_errors.email = 'that email is not registered'
    }

    //incorrect password
    if(err.message === 'Incorrect password'){
        user_errors.password = 'incorrect password'
    }

    //duplicate error
    if(err.code === 11000){
        user_errors.email = 'That email or username is already registerd'
    }

    //validation user_errors
    if(err.message.includes('user validation failed')){
        //populate the user_errors object
        Object.values(err.user_errors).forEach(({properties}) => user_errors[properties.path] = properties.message)
    }

    return user_errors

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
        res.cookie('jwt', token, {httpOnly: true, maxAge: max_age*1000, sameSite: false})
        .status(200).json({user})
    }catch(err){
        const user_errors = handleErrors(err)
        res.status(401).json({user_errors: user_errors})
        console.log(user_errors)
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/account/login')
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
        res.status(200).json({user})
        
    }
    catch(err){
        const user_errors = handleErrors(err)
        res.status(400).json({user_errors})
    }


}

module.exports.update_put = async (req, res) => {
    const {email, key, value} = req.body
    const user = await User.findOne({email})

    try{
        User.handleUpdate(email, key, value)
        res.status(200).json({user: user._id, name: user.name, email: user.email, computer_id: user.computer_id})
    }catch(err){
        const user_errors = handleErrors(err)
        res.status(400).json({user_errors})
    }
}

//Expire user booking after 2 days
Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }

const updater = async() => {
    const users = await User.find()

    users.forEach(async (user) => {
        const open_day = user.booking_date

        let current_date = new Date(`${new Date().toISOString()}`)

       // let due_day = open_day
        let due_day = new Date("2022-05-02T09:52:00.000Z")

      //  due_day = open_day.addDays(2)

        if(current_date > due_day){
            await User.updateOne({_id: user._id}, {computer_id: ''})
            await Computer.updateOne({booker_id: user._id}, {booker_id: ''})
        }
    })
}

// setInterval(()=> {
//     updater()
// }, 1000)
