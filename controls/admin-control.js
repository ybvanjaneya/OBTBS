import Admin from "../models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const addadmin = async(req,res,next)=>{
    const {username, password} = req.body;
    if(!username && username.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message:"Invalid Inputs"});
    }
    let existingadmin;
    try{
        existingadmin = await Admin.findOne({username:username});
    }catch(err){
        return console.log(err);
    }
    if(existingadmin){
        return res.status(420).json({message:"Admin already exists"});
    }
    let admin;
    const hashpwd = bcrypt.hashSync(password);
    try{
        admin = new Admin({username:username ,password:hashpwd});
        admin = await admin.save();
    }catch(err){
        return console.log(err);
    }
    if(!admin){
        return res.status(300).json({message:"Unable to store admin"});
    }
    res.status(200).json({admin});
};

export const loginadmin = async(req,res,next)=>{
    const {username, password} = req.body;
    if(!username && username.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message:"Invalid Inputs"});
    }
    let existingadmin;
    try{
        existingadmin = await Admin.findOne({username:username});
    }catch(err){
        return console.log(err);
    }
    if(!existingadmin){
        return res.status(420).json({message:"Admin not found"});
    }
    // if(existingadmin.username!=username){
    //     return res.status(302).json({message:"Incorrect admin username"});
    // }
    const ispasswordcorrect = bcrypt.compareSync(password, existingadmin.password);
    if(!ispasswordcorrect){
        return res.status(302).json({message:"Incorrect admin password"});
    }
    const token = jwt.sign({id: existingadmin._id},process.env.SECRET_KEY,{expiresIn:"7d"});
    return res.status(200).json({message:"Admin logged in...", token, id: existingadmin._id});
};

