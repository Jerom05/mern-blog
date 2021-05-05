const mongoose = require('mongoose')
module.exports = ()=>{
    mongoose.connect('mongodb://localhost:/Posts', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}).then(()=>{
    console.log('Database Connected Successfully');
})
  .catch(error => console.log(error));
  
}
