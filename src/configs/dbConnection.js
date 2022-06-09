const mongoose = require("mongoose");

const connect = ()=>{
    try{
        console.log('Database connected')
        return mongoose.connect("mongodb+srv://Nikita:nikikotiyal09@cluster0.wfwnn.mongodb.net/?retryWrites=true&w=majority")

    } catch(err){
        console.log('Error--->', err.message)
    }
}

module.exports = connect;