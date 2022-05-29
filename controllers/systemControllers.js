const Computer = require("../models/Computer")
const User = require("../models/User")

module.exports.about_get = (req, res) => res.render('about')

module.exports.support_get = (req, res) => res.render('support')

module.exports.report_get = async (req, res) => {
    try{
        const users = await User.find()
        const computers = await Computer.find()
    res.json(
        {
            status: 200,
            users: users,
            computers: computers
        }
    )
    }catch(err){
        res.json({
            status: 400,
            error: err
        })
    }
}