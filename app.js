const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const fs = require('fs')
const cert = fs.readFileSync('keys/certificate.pem')
const bulletinpostRoutes = require('./routes/bulletinpost')
const authMiddleWare = require('./middleware/checkauth')
const helmet = require('helmet');
const morgan = require('morgan');
const userRoutes = require('./routes/user')
const options = {
    server:{sslCA:cert}
}
const constring = 'mongodb+srv://st10081889:MongoDB123@cluster0.emnf8hg.mongodb.net/?retryWrites=true&w=majority'
app.use(cors({origin: 'http://localhost:4200', optionsSuccessStatus: 200}))
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json())

mongoose.connect(constring)
.then(()=>{
    console.log('Connection established')
})
.catch(()=>{
    console.log('Unable to connect')
},options)


app.use((reg, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization')
    res.setHeader('Access-Control-Allow-Methods', '*')
    next()
})

app.use('/api/user', userRoutes)
app.use('/api/bulletinpost', bulletinpostRoutes)
app.use('api/bulletinpost', authMiddleWare, bulletinpostRoutes)
module.exports=app;

