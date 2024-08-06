//sending the requests to proper apis
const express=require("express");
const router=express.Router();
const {login,checkLogin,getAllBlogs,saveBlog,getUsername,getUserBlogs,getIndividualBlog,getSearchRes,delBlog,
    editBlog,
    forgotPassword,
    generateOtp
}=require("../controller/controller");


router.route("/login").post(login);
router.route("/checkLog").post(checkLogin);
router.route("/getAllBlogs").post(getAllBlogs);
router.route("/saveBlog").post(saveBlog);
router.route("/getUsername").post(getUsername);
router.route("/getUserBlogs").post(getUserBlogs);
router.route("/getIndividualBlog").post(getIndividualBlog);
router.route("/getSearchRes").post(getSearchRes);
router.route("/delBlog").post(delBlog);
router.route("/editBlog").post(editBlog);
router.route("/forgotPassword").post(forgotPassword);
router.route("/generateOtp").post(generateOtp);

module.exports=router;