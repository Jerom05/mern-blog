const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const User = new mongoose.model('User', userSchema)

const Validation = (obj)=>{
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(80).required()
    })
    return schema.validate(obj)
}


module.exports = {
    User,
    Validation
}