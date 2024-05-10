const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(express.json());
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/curd')
.then(result=>{
    console.log("connected")
    app.listen(3001,()=>{
        console.log("Server Stared")
    })
})
.catch(error => {
    console.log("Error : "+error)
})

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    checked : {
        type : Boolean,
        required : false,
        default : false
    }
})

const userModel = mongoose.model("user",userSchema)


app.get("/",async(req,res)=>{
    try{
        const users = await userModel.find({})
        res.status(200).json(users)
    }
    catch(error){
        res.status(500).send("Fail : "+error.message)
    }
})

app.post("/",async(req,res)=>{
    try{
        const { name } = req.body
        const existingUser = await userModel.findOne({name:name})
        if(existingUser === null){
            const user = new userModel({
                name : name
            })
            await user.save()
            res.status(200).send("Success")
        }else{
            res.status(500).send("Name already exist")
        }       
    }
    catch(error){
        res.status(500).send("Fail : "+error.message)
    }
    
})

app.put("/name",async(req,res)=>{
    try{
        const { id , name } = req.body
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const existingUser = await userModel.findOne({_id: { $ne: id } , name:name})
        if(existingUser === null ){
            await userModel.findByIdAndUpdate(id,{name : name},{new:true})
            res.status(200).send("Success")
        }else{
            res.status(500).send("Name already exist")
        }
        
    }
    catch(error){
        res.status(500).send("Fail : "+error.message)
    }
})
app.put("/check", async (req, res) => {
    try {
        const { id } = req.body;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        user.checked = !user.checked;
        await user.save();
        res.status(200).send("Success");
    } catch (error) {
        res.status(500).send("Fail : " + error.message);
    }
});

app.delete("/",async(req,res)=>{
    try{
        const { id } = req.body
        await userModel.findByIdAndDelete(id)
        res.status(200).send("Success")
    }
    catch(error){
        res.status(500).send("Fail : "+error.message)
    }
})


