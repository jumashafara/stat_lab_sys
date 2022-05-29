const User = require("../models/User")
const Computer = require('../models/Computer')

const handleErrors = (err) => {
    console.log(`Error: ${err.message}, Error Code: ${err.code}`)
    const computer_errors = {name: '', na: '', user_status: ''}
    
    if (err.message.includes("computer validation failed")){
        computer_errors.name = "A computer must have a name"
    }
    if(err.message === "No free computers available"){
        computer_errors.na = "No free computers available"
    }

    if(err.message === "User already booked a computer"){
        computer_errors.user_status = "User already booked a computer"
    }

     //duplicate error
     if(err.code === 11000){
        computer_errors.name = 'That computer name is already added'
    }

    return computer_errors
}

module.exports.book_get = async (req, res) => {
    res.render('book')
}

module.exports.book_post = async (req, res) => {
    const {email} = req.body
    try {
        const user = await User.handleBooking(email)
        const booker_detail = await User.findOne({email})
        res.status(200).json({user: booker_detail})
    }catch(err){
        const computer_errors = handleErrors(err)
        res.status(400).json({computer_errors: computer_errors})
    }
}

module.exports.add_computer_post = async (req, res) => {
    const {name, details} = req.body
    try {
        const computer = await Computer.create({name, details})
        res.status(200).json({computer: computer})
    }catch(err){
        const computer_errors = handleErrors(err)
        res.status(400).json({computer_errors: computer_errors})
    }
}

module.exports.update_put = async (req, res) => {
    const {old_name, new_name} = req.body

    try{
        const computer = await Computer.handleUpdate(old_name, new_name)
        res.status(200).json({new_computer_name: new_name})
    }
    catch(err){
        const computer_errors = handleErrors(err)
        res.status(400).json({computer_errors: computer_errors})
    }
}

module.exports.delete_computer = async (req, res) => {
    const name = req.body

    try{
        await Computer.findOneAndRemove({name: name})
        res.status(200).json({deleted_computer: name})
    }catch(err){
        res.status(400).json(
            {
                error_message: 'cannot perform operation now'
            }
        )
        console.log(err.message)
    }
}




