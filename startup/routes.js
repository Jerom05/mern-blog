const express = require('express')
const user = require('../routes/user')
const auth = require('../routes/auth')

module.exports = function(app){
    app.use(express.json());
    app.use('/api/user',user)
    app.use('/api/auth',auth)
}
