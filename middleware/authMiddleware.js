const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, 'chappie', (err, decodetoken) => {
            if(err){
                //res.send(err.message)
                res.redirect('/login')
            }else {
                next()
            }
        })
    }
    else{
        res.redirect('/login')
    }
}

//check current user
const checkUser = (res, req, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'chappie', async (err) => {
            if (err) {
                res.locals.user = null
            }else{
                let user = await User.findById(decodedtoken.id)
                res.locals.user = user
                next()
            }
        })
    }else {
        res.locals.user = null
    }
}

module.exports = {requireAuth, checkUser}