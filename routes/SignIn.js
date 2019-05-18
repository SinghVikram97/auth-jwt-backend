const router=require('express').Router();
const {User} =require('../db/models')
const bcrypt =require('bcrypt')

router.post('/',(req,res)=>{

  const {email,password}=req.body;

  User.findOne({
    where: {
      email: email
    }
  }).then((user)=>{
    
    bcrypt.compare(password, user.password, function(err, result) {
      
      res.send(result);

    });
    
  });

  

})

module.exports=router