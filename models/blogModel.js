const mongoose=require("mongoose");
const blogModel=mongoose.Schema(
    {
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
        },
        name:{
            type:String,
            required:true
        },
        humanDate:{
            type:String,
            required:true
        }
    }
)

module.exports=mongoose.model("blogs",blogModel);