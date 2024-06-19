import mongoose from "mongoose";
import User from "./user.model";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    //every blog has only one user
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const Blog = mongoose.model("Blog",blogSchema);
export default Blog;