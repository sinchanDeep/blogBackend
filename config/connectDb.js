const mongoose=require("mongoose");
//creating a connection function

const connectDb=async ()=>{
    try{
        const connect=await mongoose.connect(process.env.connection_string);
        console.log("Database connected ",connect.connection.name);

    }catch(er)
    {
        console.log(er);
        process.exit(1);
    }
}
module.exports=connectDb;