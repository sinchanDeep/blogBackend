const mongoose=require("mongoose");
const jwtToken=require("jsonwebtoken");
const loginModel= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    tokens: [
        {
            token: {
                type:String,
                required:true
            }
        }
    ]
})

loginModel.methods.generateAuthToken= async function(){
    try{
        const jwt=jwtToken.sign({
            _id:this._id
    },process.env.ACCESS_TOKEN_SECRET)
    this.tokens=this.tokens.concat({token:jwt});
    await this.save();
    return jwt;

    }catch(err)
    {
        console.log(err);
    }
}

module.exports=mongoose.model("users",loginModel);