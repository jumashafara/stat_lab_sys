const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const compRoutes = require('./routes/compRoutes')
const systemRoutes = require('./routes/systemRoutes')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const {requireAuth} = require('./middleware/authMiddleware')

const app = express()

const port = process.env.PORT || 5000

app.use(express.static(__dirname + '/dist'));

app.use(cors())
//get json
app.use(express.json())

//handle cookies
app.use(cookieParser())

app.set('view engine', 'ejs')

const localDBUrl = "mongodb://127.0.0.1:27017/stat_lab_sys"
const remoteDBUrl = "mongodb+srv://<username>:<password>@cluster0.d232b.mongodb.net/stat_lab_sys?retryWrites=true&w=majority"

mongoose.connect(remoteDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(result => app.listen(port))
    .catch(error => console.log(error))

app.get('/', requireAuth, (req, res) =>{
    res.render('home')
})

app.get('/admin', (req,res) =>{
    res.render('admin')
})

app.use('/account/', authRoutes)

app.use('/computer/',requireAuth, compRoutes)

app.use('/system/', systemRoutes)

app.get('/*', (req, res) => {
    res.render('notfound')
})
