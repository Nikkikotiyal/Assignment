const bcrypt = require("bcrypt")
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const router = express.Router();
const User = require('../model/user.model');
const phoneNumber = require('../utils/phoneValidCheck')


// API/end points to get all customers/ users

router.get("/api/getusers", async(req,res)=>{
    try{
        const users =await User.find();
        console.log('users----->', users)
        return res.status(201).send(users)
    }catch(err){
        return res.status(500).send(err.message)
    }
})


// API/end points to get signin 
// user will get token along with payload data if successfully logged in

router.post("/api/signin", async (req,res)=>{
    try{
        const number = req.body.number;
        const password = req.body.password;
        if(number){
            const user = await User.findOne({number:number});
            if(!user){
                return res.status(400).json({msg:"user with this Phone number does not exist, please register"})
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(400).json({msg:"Invalid Password, Please check your password"})
            }
            const tokenPayload = {
                _id:user._id,
                number:user.number,
                username:user.username
            }
            console.log('token payload', tokenPayload)
            const token = jsonwebtoken.sign(tokenPayload, "secret", {expiresIn:'365d'});
            return res.status(200).json({token, tokenPayload})
        }

    }catch(err){
        return res.status(400).send(err.message)
    }
})


//API // end points to register a user 
// Phone number should be unique

router.post("/api/signup", async (req, res) => {
    try {
        const number = req.body.number;

        const isValidNumber = phoneNumber(number);

        if(!isValidNumber){
            return res.status(500).json({'msg': "Not a valid Number, Please enter valid number"})
        }

        const username = req.body.username;
        const password = req.body.password;
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            username: username,
            number: number,
            password:hashedPassword
        })
        return res.status(200).json({'msg': "User Registered Successfully", "User":user});
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

module.exports = router;