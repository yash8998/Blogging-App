const express = require('express')
const path = require('path')
const {connectToMongoDB} = require('./connect')


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

// To parse url body
app.use(express.json())
// To support form data
app.use(express.urlencoded({extended:false}));

// Routes
app.use("/", staticRoute)
app.use("/user",userRoute)


app.get('/', (req,res)=>{
    res.render('home')
})

app.listen(PORT, ()=>console.log(`Server started at PORT:${PORT}`))

