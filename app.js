const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const compRoutes = require('./routes/compRoutes')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const {requireAuth, checkUser } = require('./middleware/authMiddleware')

const app = express()

const port = 5000

app.use(express.static(__dirname + '/dist'));

app.use(cors())
//get json
app.use(express.json())

app.set('view engine', 'ejs')

const localDBUrl = "mongodb://127.0.0.1:27017/stat_lab_sys"
const remoteDBUrl = "mongodb+srv://shafara:chappie@cluster0.d232b.mongodb.net/stat_lab_sys?retryWrites=true&w=majority"

mongoose.connect(localDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(result => app.listen(port, () => console.log("Server running at port 5000")))
    .catch(error => console.log(error))

//app.get('*', checkUser)

app.get('/', (req, res) =>{
    res.render('home')
})
app.get('/boo', requireAuth, )


app.use('/account/', authRoutes)

app.use('/computer/', compRoutes)
