import Joi, { schema } from 'joi-browser'

const validate = (data)=>{
    const result = Joi.validate(data, schema, {abortEarly:false})
}