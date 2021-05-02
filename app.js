const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 5000
const {MONGOURI} = require('./key')





mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("Connected to Mongoose")
})

mongoose.connection.on('error',(err)=>{
    console.log("Error to Mongoose",err)
})


require('./models/user')
require('./models/post')


app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/postroute'))
app.use(require('./routes/user'))


app.listen(PORT,()=>{
    console.log("server started on server ",PORT)
})