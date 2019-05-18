const router=require('express').Router();

const bcrypt=require('bcrypt');
const saltRounds=10;


const {User} =require('../db/models')

router.get('/',(req,res)=>{
  res.send('Sign Up');
})

router.post('/',(req,res)=>{

  const {firstName,email,password}=req.body;

  bcrypt.hash(password,saltRounds,(err,hash)=>{
    User.create({
      firstName:firstName,
      email:email,
      password:hash
    }).then((user)=>{
      res.send(user);
    })
  })

})

module.exports=router