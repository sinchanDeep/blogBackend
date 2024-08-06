const asyncHandler=require("express-async-handler");
const users=require("../models/loginModel");
const allBlog=require("../models/blogModel");
const allblogs=require("../models/saveBlogModel");
const cookieParser=require("cookie-parser");
const nodemailer=require("nodemailer");
const bcrypt=require("bcryptjs");
//const loginModel = require("../models/loginModel");

//@desc api to store registration data
//@route post/api/blog
//@access public
const login=asyncHandler( async(req,res)=>{
    let {name,email,pass}=req.body;
    pass= await bcrypt.hash(pass,12);
    const userExist= await users.findOne({email});
    if(userExist)
    {
        res.json("exists")
    }
    const user= await users.create({
        name,
        email,
        pass
    })
    res.json("successful");  
});

//@desc api to check the credentials
//@route post/api/blog
//@access public
const checkLogin=asyncHandler ( async(req,res)=>{
    let tkn;
    let {email,pass}=req.body;
    
    const user= await users.findOne({email});   
    if(user)
    {   
        if(!await bcrypt.compare(pass,user.pass))
            res.json("wrongPass");
        propCred=await users.find({email,pass:user.pass});
        if(propCred.length!=0)
        {        
            tkn= await user.generateAuthToken();         
            res.json({"logged":"logged","token":tkn});           
        }
        else
        res.json("wrongPass");
    }
    else
    {
        res.json("notExists");
    }
});

//@desc gets all the blogs from db
//@path post/api/getAlBlogs
//@access public
const getAllBlogs = asyncHandler(async(req,res)=>{
    const allBlogs=await allBlog.find({});
    
    res.json(allBlogs);
});

//@desc saves the blog
//@path post/api/saveBlog
//@access public
const saveBlog=asyncHandler(async(req,res)=>{ 
    let {date,description,picture,title,name}=req.body;
    const blogExist=await allBlog.find({date:date,name:name});
    let updDate=new Date();
        let day=updDate.getUTCDay();
        let month=updDate.getUTCMonth();
        let year=updDate.getUTCFullYear();
        let humanDate=day+"/"+month+"/"+year;
    if(blogExist.length>0)
    {
        
        const updateBlog=await allBlog.findOneAndReplace({
            name:name,
            date:date
           
        },{date:new Date(),description:description,picture:picture,title:title,name:name,humanDate:humanDate});
        if(updateBlog)
            res.json("updated");
    }
    else
    {
    if(!picture)
    {
        picture="https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
    }
    try{      
        date=new Date(); 
        const save = await allBlog.create({
            date,
            description,
            picture,
            title,
            name,
            humanDate
        });
        if(save)
        {
            res.json("saved");
        }else{
            res.json("notsaved");
        }

    }catch(err)
    {
        console.log(err);
    }
}
});

//@desc api to get the username
//@path post/api/getUsername
//@access public
const getUsername=asyncHandler( async (req,res)=>{
    const token=req.body;
    const tkn=token.tkn;
    const username= await users.find({tokens:{$elemMatch:{token:tkn}}});
    res.json(username[0].name);
});

//@desc api to get user blogs
//@path post/api/getUserBlogs
//@access public
const getUserBlogs=asyncHandler(async(req,res)=>{
    const {name}=req.body;
    const userBlogs=await allBlog.find({name});
    res.json(userBlogs);

});
//@desc gets the individual blog
//@path post/api/getIndividualBlog
//@access public
const getIndividualBlog=asyncHandler(async (req,res)=>{
    const {date}=req.body;
    const individualBlog= await allBlog.find({date:date});
    if(individualBlog){
        res.json(individualBlog);
    }
});

//@desc gets the searched blogs
//@path post/api/getSearchRes
//@access public
const getSearchRes=asyncHandler(async(req,res)=>{
    const {searchKey}=req.body;
    //const blogs = await allBlog.find({$text:{$search:searchKey,$caseSensitive:false}});
    const blogs= await allBlog.find({description: {$regex: searchKey,$options:'i'}});
    res.json(blogs);

});

//@desc deletes a blog
//@path post/api/delBlog
//@access public
const delBlog=asyncHandler(async(req,res)=>{
    const {delBlog}=req.body;
    const status=await allBlog.deleteOne({date:delBlog});
    console.log(delBlog);
    res.json(status);
});

//@desc api to edit blog
//@path post/api/editBlog
//@access public
const editBlog=asyncHandler(async(req,res)=>{
    const {date,name}=req.body;
    const blog=await allBlog.find({date:date,name:name});
    
    if(blog)
    {
        res.json(blog);
    }
    else{
        res.json("notfound");
    }
});

//@desc api to generate otp
//@path post/api/generateOtp
//@access public
const generateOtp=asyncHandler( async(req,res)=>{
    const {mail,otp}=req.body;
    //let otp = parseInt(Math.random() * 100000);
  //res.json(otp);
  //sending an email
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hairartistry333@gmail.com",
      pass: "nypn upan jovm rcrv",
    },
  });

  var mailOptions = {
    from: "hairartistry333@gmail.com",
    to: mail,
    subject: "Password Reset Verification",
    text: `your otp for password resetting is ${otp}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.json("");

});

//@desc api to reset password
//@path post/api/forgotPassword
//@access public
const forgotPassword= asyncHandler(async(req,res)=>{
    let {password,cpassword,mail}=req.body;
    let result;
    if(password==cpassword)
    {
        password=await bcrypt.hash(password,12);
        result=await users.updateOne({email:mail},{pass:password});
    }
    if(result)
        res.json("updated");
    else
    res.json("notupdated");
    
});

module.exports={generateOtp,forgotPassword,editBlog,login,checkLogin,getAllBlogs,saveBlog,getUsername,getUserBlogs,getIndividualBlog,getSearchRes,delBlog};