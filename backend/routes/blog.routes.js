import express from "express"
import { createBlog, getAllBlogs, updateBlog } from "../controllers/blog.controller";

const blogRouter = express.Router();


//get all blogs
blogRouter.get("/",getAllBlogs)
blogRouter.post("/addBlog",createBlog)
blogRouter.post("/update/:id",updateBlog)
blogRouter.get("/:id",getById)

export default blogRouter