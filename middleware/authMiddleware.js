const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, 'chappie', async (err, decodedtoken) => {
            if(err){
                res.redirect('/account/login')
            }else {
                let user = await User.findById(decodedtoken.id)
                res.locals.user = user
                next()
            }
        })
    }
    else{
        res.redirect('/account/login')
    }
}

//check current user
const checkUser = (res, req, next) => {
    // const token = req.cookies.jwt
    // if (token) {
    //     jwt.verify(token, 'chappie', async (err) => {
    //         if (err) {
    //             res.locals.user = null
    //         }else{
    //             let user = await User.findById(decodedtoken.id)
    //             res.locals.user = user
    //             next()
    //         }
    //     })
    // }else {
    //     res.locals.user = null
    //     res.status(401)
    // }
}

module.exports = {requireAuth, checkUser}