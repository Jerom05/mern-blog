const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:/myDB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}).then(()=>{
    console.log('Database Connected Successfully');
})
  .catch(error => console.log(error));
 
