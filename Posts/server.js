const express = require('express')
const app = express()
app.use(express.json())

require('./startup/db')()
require('./startup/routes')(app)
app.use(require('./startup/error'))

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(5000,()=>{
    console.log('server is running')
})

