import User from "../models/User";
import Booking from "../models/Booking";
import bcrypt from "bcryptjs";
import { deletebooking } from "./booking-control";

export const getallusers = async(req,res,next)=>{
    let users;
    try{
        users = await User.find();
    }
    catch(err){
        return console.log("Error!!");
    }

    if(!users){
        return res.status(300).json({message:"Error!!"});
    }
    return res.status(200).json({users});
};

export const signup = async(req, res, next)=>{
    const {username, email, password} = req.body;
    if(!username && !password && password.trim()==="" && !email && email.trim()===""){
        return res.status(422).json({message:"Invalid Inputs"});
    }
    const exist = await User.findOne({username});
    if(exist){
        return res.status(303).json({message:"Username already exists"});
    }
    const existemail = await User.findOne({email});
    if(existemail){
        return res.status(303).json({message:"Email already exists"});
    }
    const hashedpassword = bcrypt.hashSync(password);
    let user;
    try{
        user = new User({username, email, password:hashedpassword});
        user = await user.save();
    }catch(err){
        return console.log("Error11!!");
    }
    if(!user){
        return res.status(300).json({message:"Error!!"});
    }
    return res.status(200).json({id:user._id, message:"Signup succesful"});
};

export const updateuser = async(req, res, next)=>{
    const id = req.params.id;
    const {username, email, password} = req.body;
    if(!username && username.trim()==="" && !password && password.trim()==="" && !email && email.trim()==="" ){
        return res.status(422).json({message:"Invalid Inputs"});
    }
    const hashedpassword = bcrypt.hashSync(password);
    let user;
    try{
        user = await User.findByIdAndUpdate(id, {username, email:email, password:hashedpassword});
    }catch(err){
        return console.log(err);
    }
    if(!user){
        return res.status(300).json({message:"Error user!!"});
    }
    return res.status(200).json({id:user._id,message:"Updated user succesfully"});
};

export const getusername = async(req, res, next) => {
    const {email} = req.body;
    if(!email && email.trim()===""){
        return res.status(422).json({message:"Invalid Inputs"});
    }
    let user;
    try{
        user = await User.findOne({email:email});
    }catch(err){
        return console.log(err);
    }
    if(!user){
        return res.status(300).json({message:"User not found"});
    }
    return res.status(200).json({user});
};

// export const forgetuser = async(req, res, next)=>{
//     const id = req.params.id;
//     const {username, password, email} = req.body;
//     if(!username && username.trim()==="" && !password && password.trim()==="" && !email && email.trim()===""){
//         return res.status(422).json({message:"Invalid Inputs"});
//     }
//     const hashedpassword = bcrypt.hashSync(password);
//     let user;
//     try{
//         user = await User.findByIdAndUpdate(id, {username, password:hashedpassword, email});
//     }catch(err){
//         return console.log(err);
//     }
//     if(!user){
//         return res.status(300).json({message:"Error user!!"});
//     }
//     return res.status(200).json({id:user._id,message:"Updated user succesfully"});
// };

export const deleteuser = async(req, res, next)=>{
    const id = req.params.id;
    let user;
    try{
        // user = await User.findById(id);
        // {user.bookings.length>0 && user.bookings.map((booking, index)=>deletebooking({req:booking}))}
        user = await User.findByIdAndRemove(id);
    }catch(err){
        return console.log(err);
    }
    if(!user){
        return res.status(300).json({message:"Error user!!"});
    }
    return res.status(200).json({message:"Deleted user succesfully"});
};
export const loginuser = async(req, res, next)=>{
    const {username, password} = req.body;
    if(!username && username.trim()==="" && !password && password.trim()===""){
        return res.status(422).json({message:"Invalid Inputs"});
    }
    let existinguser;
    try{
        existinguser = await User.findOne({username});
    }catch(err){
        return console.log(err);
    }
    if(!existinguser){
        return res.status(300).json({message:"Unable to find user with given username"});
    };
    const ispwdcorrect = bcrypt.compareSync(password, existinguser.password);
    
    if(!ispwdcorrect){
        return res.status(300).json({message:"Incorrect Password"});
    };
    return res.status(200).json({id:existinguser._id, message:"Login succesful"});
};

export const getuserbyid = async(req,res,next)=>{
    const id = req.params.id;
    let user;
    try{
        user = await User.findById(id);
    }catch(err){
        return console.log(err);
    }
    if(!user){
        return res.status(314).json({message:"Invalid user id"});
    }
    return res.status(200).json({user});
};

export const getbookingsofuser = async(req, res, next)=>{
    const id = req.params.id;
    let bookings;
    try{
        bookings = await Booking.find({ user: id});
    }catch(err){
        return console.log(err);
    }
    if(!bookings){
        return res.status(316).json({message:"Unable to get bookings"});
    }
    return res.status(200).json({bookings});
};