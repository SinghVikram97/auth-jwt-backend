const express=require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const signInRouter=require('./routes/SignIn');
const signUpRouter=require('./routes/SignUp');


const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/',(req,res)=>{
  res.send("HI");
})

app.use("/signin", signInRouter);
app.use('/signup',signUpRouter);



app.listen('4000',()=>{
  console.log('Server started on port 4000');
})