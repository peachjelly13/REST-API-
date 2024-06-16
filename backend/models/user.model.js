import mongoose from "mongoose"


const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
})

const User = mongoose.model("User",userSchema);
export default User;
//will come as users in our mongodb collection 
//remember this convention clearly
