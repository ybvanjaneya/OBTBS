import Bus from "../models/Bus";
import jwt from "jsonwebtoken";


export const addbus = async(req,res,next)=>{
    const extractedtoken = req.headers.authorization.split(" ")[1];
    if(!extractedtoken && extractedtoken.trim()===""){
        return res.status(404).json({message:"Token not found"});
    }
    const {number, from, to, Totalseats, bookings, date, price} = req.body;
    if(!number && !from && from.trim()==="" && !to && to.trim()==="" && !Totalseats && !bookings && bookings.trim()==="" && !date && date.trim()==="" && !price && price.trim()===""  ){
        return res.status(422).json({message:"Invalid inputs"});
    }
    let adminid;
    //verify extracted token
    jwt.verify(extractedtoken, process.env.SECRET_KEY, (err, decrypted)=>{
        if(err){
            return res.status(404).json({message:`${err.message}`});
        }else{
            adminid=decrypted.id;
            return;
        }
    });
    const exist = await Bus.findOne({number, date});
    if(exist){
        return res.status(303).json({message:"Bus number already exists"});
    }
    //create new bus
    if(adminid){
        let bus;
        try{
            bus = new Bus({number, from, to, Totalseats, bookings, date: new Date(`${date}`), price, booked:0 });
            bus = await bus.save();
        }catch(err){
            return console.log(err);
        }
        if(!bus){
            return res.status(307).json({
                message:"Request failed"
            });
        }
        return res.status(200).json({bus});
    }
    
};

export const getbuses = async(req, res, next)=>{
    let buses;
    try{
        buses = await Bus.find();
    }catch(err){
        return console.log(err);
    }
    if(!buses){
        return res.status(309).json({message:"Request failed"});
    }
    return res.status(200).json({buses});
};

export const getbusbyid = async(req, res, next)=>{
    const id = req.params.id;
    let bus;
    try{
        bus = await Bus.findById(id);
    }catch(err){
        return console.log(err);
    }
    if(!bus){
        return res.status(310).json({message:"Invalid bus id"});
    }
    return res.status(200).json({bus});
};

export const getbusbysearch = async(req, res, next)=>{
    const {from, to, date} = req.body;
    if(!from && !to  && !date){
        return res.status(422).json({message:"Invalid Inputs"});
    }
    let buses;
    console.log(from, to, date);
    if(date && from && to){
        try{
            buses = await Bus.find({from:from, to:to, date: new Date(`${date}`)});
        }catch(err){
            return console.log(err);
        }
        console.log("date given way");
    }else if(!date && from && to){
        try{
            buses = await Bus.find({from:from, to:to});
        }catch(err){
            return console.log(err);
        }
        console.log("Date not given");
    }else if(!to && !date){
        try{
            buses = await Bus.find({from:from});
        }catch(err){
            return console.log(err);
        }
        console.log("to and date not given");
    }else if(!from && !date){
        try{
            buses = await Bus.find({ to:to});
        }catch(err){
            return console.log(err);
        }
        console.log("from and date not given");
    }
    else if(!from && date && to){
        try{
            buses = await Bus.find({ to:to,date: new Date(`${date}`)});
        }catch(err){
            return console.log(err);
        }
        console.log("from not given");
    }else if(!to && date && from){
        try{
            buses = await Bus.find({ from:from, date: new Date(`${date}`)});
        }catch(err){
            return console.log(err);
        }
        console.log("to not given");
    }else if(!to && date && !from){
        try{
            buses = await Bus.find({ date: new Date(`${date}`)});
        }catch(err){
            return console.log(err);
        }
        console.log("to and from not given");
    }
    if(!buses){
        console.log("!buses error");
        return res.status(309).json({message:"Request failed"});
        
    }
    return res.status(200).json({buses});
};
export const deletebus = async(req, res, next)=>{
    const id = req.params.id;
    let bus;
    try{
        bus = await Bus.findByIdAndRemove(id);
    }catch(err){
        return console.log(err);
    }
    if(!bus){
        return res.status(311).json({message:"Error bus!!"});
    }
    return res.status(200).json({message:"Deleted bus succesfully"});
};

export const updatebus = async(req,res,next)=>{
    const id = req.params.id;
    const {number, Totalseats, from, to, date, price, booked} = req.body;
    // if(!number && number.trim()==="" && Totalseats && Totalseats.trim()==="" && !from && from.trim()==="" && !to && to.trim()==="" && !price && price.trim()==="" && !date && date.trim()===""){
    //     return res.status(422).json({message:"Invalid Inputs"});
    // }
    let bus;
    if(date){
        try{
            bus = await Bus.findByIdAndUpdate(id,{number, Totalseats,from, to, date: new Date(`${date}`), price, booked})
        }catch(err){
            return console.log(err);
        }
    }
    else{
        try{
            bus = await Bus.findByIdAndUpdate(id,{number, Totalseats,from, to, price, booked: booked})
        }catch(err){
            return console.log(err);
        }
    }
    
    if(!bus){
        return res.status(300).json({message:"Error updating bus!!"});
    }
    return res.status(200).json({id:bus._id,message:"Updated bus succesfully"});
};

export const busbookedupdate = async(req,res,next)=>{
    const id = req.params.id;
    const { booked} = req.body;
    let bus;
    try{
        bus = await Bus.findByIdAndUpdate(id,{ booked})
    }catch(err){
        return console.log(err);
    }
    if(!bus){
        return res.status(300).json({message:"Error updating bus!!"});
    }
    return res.status(200).json({id:bus._id,message:"Updated bus succesfully"});
};


export const bookedupdate = async(req,res,next)=>{
    let bus;
    try{
        bus = await Bus.updateMany({ booked: 0})
    }catch(err){
        return console.log(err);
    }
    if(!bus){
        return res.status(300).json({message:"Error updating bus!!"});
    }
    return res.status(200).json({message:"Updated buses succesfully"});
};

export const totalupdate = async(req,res,next)=>{
    let bus;
    try{
        bus = await Bus.updateMany({ Totalseats: 40})
    }catch(err){
        return console.log(err);
    }
    if(!bus){
        return res.status(300).json({message:"Error updating bus!!"});
    }
    return res.status(200).json({message:"Updated total seats succesfully"});
};
