const mongoose = require('mongoose')
const Joi = require('joi')
const postSchema = mongoose.Schema({
    authorid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },

    author:{
        type:String,
        required:true
    },

    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now, 
    },
    comments: [{
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name:{
            type:String,
            required:true
        },
        description: {
            type:String,
            required: true
        },
        date:{
            type:Date,
            default: Date.now, 
        }
    }]

})

const Post = new mongoose.model('Post', postSchema);

const Validation = (obj)=>{
    const schema = Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required()
    })

    return schema.validate(obj)
} 

module.exports = {
    Post,
    Validation
}