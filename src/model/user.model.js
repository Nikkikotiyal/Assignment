const  mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true, " User name is required to create user"],
    },
    number:{
        type:Number,
        required:[true, "Phone Number is required"],
        unique:[true, "User already Registered with this Number, try signin"]
    },
    password:{
        type:String,
        required:[true, "password is required to create user"],
        minlength:[6, "password length should be atleast 6 char long"]
    }
},{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("user", userSchema);