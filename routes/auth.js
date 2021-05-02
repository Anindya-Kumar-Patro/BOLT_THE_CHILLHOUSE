const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User")
const bcrypt = require('bcryptjs');
const {JWT_SECRET} = require('../key')
const jwt = require('jsonwebtoken')
const requiredLogin = require('../middleware/requiredLogin') 


router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body
    if(!email || ! password || !name){
        return res.status(422).json({err:"Please fill all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({err:"User already exsist"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
        user.save()
        .then(user=>{
            res.json({message:"Signed Up sucessfully"})
        }).catch(err=>{
            console.log(err)
        })
        })
            
    }).catch(err=>{
        console.log(err)
    })
    
})

router.post('/login',(req,res)=>{
    const {email, password} = req.body
    if(!email || !password){
       return res.status(422).json({err:"Fill in credaintials"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({err:"User doesn't exsist, please sign up"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"Successful login"})
                const token = jwt.sign({_id : savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following} = savedUser
                res.json({token,user:{_id,name,email,followers,following}})
            }
            else{
                return res.status(422).json({err:"Invalid username or password"})
            }
            
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
module.exports = router