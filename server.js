const express = require('express')
const app = express()

require('./startup/db')
require('./startup/routes')(app)

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(3000,()=>{
    console.log('server is running')
})
