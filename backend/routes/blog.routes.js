import express from "express"
import { createBlog, deleteBlog, getAllBlogs, getById, updateBlog } from "../controllers/blog.controller";

const blogRouter = express.Router();


//get all blogs
blogRouter.get("/",getAllBlogs)
blogRouter.post("/addBlog",createBlog)
blogRouter.post("/update/:id",updateBlog)
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",deleteBlog)

export default blogRouter