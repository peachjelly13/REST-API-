import User from "../models/user.model";
import bcrypt from "bcryptjs"

const getAllUsers = async (req,res,next) =>{
    let users;
    try {  //put await because its a database connectiona nd it can take time
        users = await User.find();
        
    } catch (error) {
        return console.log(error)
        
    }
    if(!users){
        return res.status(400).json({message:"No users found"})
    }
    res.status(200).json({users})
}

//this is a signup , if you have already signed up and signup again 
//with the same credentials it will give you an unauthorized message
const signup = async(req,res,next)=>{
    const {email,name,password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});

        
    } catch (error) {
        return console.log(error)
        
    }
    if(existingUser){
        return res.status(400).json({message:"User already exists"})
        // this is when the email credentials already exist
    }
    const storedPassword = password.hashSync(password);
    //we canno directly store password in our database hence it is important that we 
    //save it in a hashed format 
    const user = new User({
        name,
        email,
        password:storedPassword,
        blogs:[]
    })
    
    // method inside mongoose to save our user
    try {
       await  user.save()
    } catch (error) {
        return console.log(error)
    }
    return res.status(201).status(user,{message:"User has been created"})

    // but if the email credentials do not exist already then 
}

const login = async(req,res,next)=>{
    const {email,password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
        
    }
    if(!existingUser){
        res.send(400).json({message:"Wrong email id, User not found"})
    }
    const isPasswordcorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordcorrect){
        res.send(400).json({message:"wrong password"})
    }
    res.send(200).json({message:"User logged in"})


}

export {
    getAllUsers,
    signup,
    login
}