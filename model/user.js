const mongoose = require('mongoose')
const Joi = require('joi')


const schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength: 2,
        maxlength: 50
    },
    email:{
        type:String,
        required:true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
})

const User = new mongoose.model('User', schema)

const validation = (req)=>{
    const schema = Joi.object({
        name:Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(req)
}
module.exports ={
    User,
    validation
}