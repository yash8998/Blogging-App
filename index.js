const express = require('express')
const path = require('path')
const {connectToMongoDB} = require('./connect')


//Routers for routes
const staticRoute = require('./routes/staticRouter');


const app = express()
const PORT = 8000

// Connect MongoDB
connectToMongoDB('mongodb://localhost:27017/blogifyy').then(
    () => console.log('MongoDB Connected')
);


app.set('view engine', 'ejs')
app.set('views',path.resolve('./views'))

// To parse url body
app.use(express.json())

// Routes
app.use("/", staticRoute)


app.get('/', (req,res)=>{
    res.render('home')
})

app.listen(PORT, ()=>console.log(`Server started at PORT:${PORT}`))

