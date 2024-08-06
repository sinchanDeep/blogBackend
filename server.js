const express=require("express");
const App=express();
const dotenv=require("dotenv").config();
const cors=require("cors");
const cookieParser=require("cookie-parser");
const connectDb=require("./config/connectDb");
const errorHandler=require("./middleware/errorHandler");
const bodyParser=require("body-parser");
const port=process.env.PORT;

//limit of payload
App.use(bodyParser.json({limit:"5mb",extended:true}));
App.use(bodyParser.urlencoded({extended:true,parameterLimit:5000,limit:"5mb"}));
//App.use(bodyParser.text({limit:"200mb"}));

//cors middleware
App.use(cors());



//json middleware
App.use(express.json());

//receiving requests
App.use("/api/blog",require("./Routes/routeHandler"));

//error handler
App.use(errorHandler);

//cookie parser
App.use(cookieParser);

//database connection
connectDb();



//server listener port
App.listen(port,()=>{
    console.log("Server is listening at port ",port);
});
