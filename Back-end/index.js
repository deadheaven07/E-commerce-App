const express = require("express");
const cors = require("cors");

const user = require("./db/user");

//product schema
const product = require("./db/product");

require('./db/config');
const users = require ("./db/user");
//const product = require("./db/product");

const app = express();

//middleware
app.use(express.json());
app.use(cors());
//route
app.post("/register", async (req, res) => {
    let userr = new user(req.body);
    let result = await userr.save();
    //hiding password from user 
    result = result.toObject();
    delete result.password
    res.send(result);
})





//login route
app.post("/login",async(req,res)=>{
    console.log(req.body)
    if(req.body.password && req.body.email){
        let user = await user.findOne(req.body).select("-password");
        //for checking user is true
        if(user){
            res.send(user)
        }else{
           res.send({result:"NOT A VALID USER :"})
        }
    }else{
        res.send({result:"NOT A VALID USER :"})
    }
    
})

//product route
app.post("/add-product",async(req,res)=>{
    let product= new Product(req.body);
    let result = await product.save();
    res.send(result);
})



app.listen(4500);   
