import Blog from "../models/blog.model";

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
    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try {
        await blog.save();
    } catch (error) {
        return console.log(error)
        
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

export {
    getAllBlogs,
    createBlog,
    updateBlog,
    getById
}