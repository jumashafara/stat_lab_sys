const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')
const {Error} = require('mongoose')
const Computer = require('./Computer')
const { stringify } = require('nodemon/lib/utils')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter an name'],
        unique: true
    },
    email:{
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum length is 6 characters']
    },
    date_joined: {
        type: Date,
        required: true,
        default: Date.now()
    },
    computer_id: {
        type: String,
        default: ''
    },
    booking_date: Date
    
})

//create a login authenticator on user schema
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email})

    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        throw new Error('Incorrect password')
    }
    throw new Error('Incorrect email')
}

// handle bookings
userSchema.statics.handleBooking = async function( email ){
    const user = await this.findOne({email})
    const free_computers = await Computer.find({booker_id: ''})
    
     if(user.computer_id == ''){
        if(free_computers.length !== 0){
            const user_id = stringify(user._id)
            const first_free_comp_id = stringify(free_computers[0]._id)
            await this.updateOne({email}, {computer_id: first_free_comp_id, booking_date: Date.now()})
            await Computer.updateOne({_id: first_free_comp_id}, {booker_id: user_id})
            return user
        }
        throw new Error('No free computers available')
    }
    throw new Error("User already booked a computer")
}

userSchema.statics.handleUpdate = async function(email, key, value){
    if (key == 'name'){
        await this.updateOne({email}, {name: value})
    }
    if (key == 'email'){
        await this.updateOne({email}, {email: value})
    }
    if (key == 'password'){
        await this.updateOne({email}, {password: value})
    }
}

//hash password before saving
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model('user', userSchema)

module.exports = User