const  express = require("express");
const app = express();

const User = require("./model/user.model")
const dbConnection = require("./configs/dbConnection");
const userController = require("../src/controller/userController")

app.use(express.json());
app.use(userController)

app.listen(3000, async function(){
    await dbConnection();
    console.log('listening to port', 3000)
})