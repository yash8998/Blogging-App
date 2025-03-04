const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

const {connectToMongoDB} = require('./connect')
const {checkForAuthCookie} = require('./middlewares/authentication')


//Routers for routes
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')


const app = express()
const PORT = 8000

// Connect MongoDB
connectToMongoDB('mongodb://127.0.0.1:27017/blogify').then(
    () => console.log('MongoDB Connected')
)

app.set('view engine', 'ejs')
app.set('views',path.resolve('./views'))


// Global Middlewares: They will be triggered before all the requests
// To parse url body
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cookieParser())
app.use(checkForAuthCookie('token'))

app.use((req, res, next) => {
    console.log("🛠 Global Middleware Check:", res.locals.user)
    next()
})


// Routes
app.use("/", staticRoute)
app.use("/user",userRoute)


app.get('/', (req,res)=>{
    res.render('home')
})

app.listen(PORT, ()=>console.log(`Server started at PORT:${PORT}`))

