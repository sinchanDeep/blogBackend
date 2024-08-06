const mongoose=require("mongoose");
const saveBlogModel=mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("allblogs",saveBlogModel);