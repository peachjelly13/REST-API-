import mongoose from "mongoose";
import Blog from "../models/blog.model";
import User from "../models/user.model";

const getAllBlogs = async (req,res,next)=>{
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (error) {
        return console.log(error);
    }
    if(!blogs){
        res.status(400).json({message:"No blogs found"})
    }
    return res.status(200).json({message:"These are the blogs"})
}

const createBlog = async(req,res,next)=>{
    const {title,description,image,user} = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error);
    }
    if(!existingUser){
        return res.status(400).json({message:"Unable to find User by this Id"})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        //saving a user from a particular session
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
        //saving user from a particular session
    } catch (error) {
        return console.log(error)
        return res.status(500).json({message:error})
        
    }
    return res.status(200).json({message:"Blog created"})
}

const updateBlog = async(req,res,next)=>{
    const {title,description} = req.body;
    const blogId = req.params.id;
    let blog;
   try {
     blog  = await Blog.findByIdAndUpdate(blogId,{title,description});
   } catch (error) {
    return console.log(error);
    
   }
   if(!blog){
    return res.status(500).json({message:"Unauthorized request"})
   }
   return res.status(200).json({blog})
}

//getting a blog from a specific Id

const getById = async(req,res,next)=>{
    const Id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(Id)
    } catch (error) {
        return console.log(error)
        
    }
    if(!blog){
        return res.status(404).json({message:"No such blog found"});

    }
    return res.status(200).json({blog})
}

const deleteBlog = async(req,res,next)=>{
    const Id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(Id).populate('user');
        await blog.user.blogs.pull(blog)
        blog.user.save();
    } catch (error) {
        return console.log(error);
    }
    if(!blog){
        res.status(400).json({message:"Blog to delete doesnt exist"})
    }
    res.status(200).json({message:"Successfully deleted"})
}

const userBlog = async(req,res,next)=>{
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate('blog');
    } catch (error) {
        return console.log(error)
    }
    if(!userBlogs){
        return res.status(400).json({message:"No blog found"});
    }
    return res.status(200).json({blogs:userBlogs})
}

export {
    getAllBlogs,
    createBlog,
    updateBlog,
    getById,
    deleteBlog,
    userBlog
}