const express = require('express')
const app = express()
const cors = require("cors");
app.use(cors())
require('express-async-errors')
require('./startup/db')
require('./startup/routes')(app)

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(5000,()=>{
    console.log('server is running')
})
