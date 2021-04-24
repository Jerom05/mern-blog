module.exports = function(err, req, res, next){
    console.log('Error Found: ', err)
    res.status(500).send(err);
  }