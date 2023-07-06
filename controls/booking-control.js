import mongoose from "mongoose";
import Booking from "../models/Booking";
import Bus from "../models/Bus";
import User from "../models/User";

export const newbooking = async(req, res, next)=>{
    const{bus, date, busnumber, from ,to, seatnumber, user, fare, reserved} = req.body;
    if(!bus && bus.trim()==="" && !date && date.trim()==="" && !seatnumber && seatnumber.trim()==="" && !user && user.trim()==="" && !busnumber && busnumber.trim()==="" && !from && from.trim()==="" && !to && to.trim()==="" && !fare && fare.trim()==="" && !reserved && !username && username.trim()==="" ){
        return res.status(422).json({message:"Invalid inputs"});
    }
    let existingbus;
    let existinguser;
    try{
        existingbus = await Bus.findById(bus);
        existinguser= await User.findById(user);
    }catch(err){
        return console.log(err);
    }
    if(!existingbus){
        return res.status(404).json({message: "Bus not found"});
    }
    if(!existinguser){
        return res.status(404).json({
            message: "User not found"
        });
    }
    let booking;
    try{
        booking = new Booking({
            bus,
            busnumber,
            from,
            to,
            date: new Date(`${date}`),
            seatnumber,
            user,
            fare,
            reserved,
            username: existinguser.username
        });
        const session = await mongoose.startSession();
        session.startTransaction();
        existinguser.bookings.push(booking);
        existingbus.bookings.push(booking);
        await existinguser.save({session});
        await existingbus.save({session});
        await booking.save({session});
        session.commitTransaction();
        // booking = await booking.save();
    }catch(err){
        return console.log(err);
    }
    if(!booking){
        return res.status(500).json({message:"Unable to create a booking"});
    }
    return res.status(200).json({ booking });
};

export const deletebooking = async(req, res, next)=>{
    const id = req.params.id;
    let booking;
    try{
        booking = await Booking.findByIdAndRemove(id).populate("user bus");
        console.log(booking);
        let book = booking.seatnumber;
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.bus.bookings.pull(booking);
        await Bus.findByIdAndUpdate(booking.bus._id,{booked:Number(booking.bus.booked)-Number(book)})
        await booking.bus.save({session});
        await booking.user.save({session});
        session.commitTransaction();
    }catch(err){
        return console.log(err);
    }
    if(!booking){
        return res.status(312).json({message:"Unable to delete!!"});
    }
    return res.status(200).json({message:"Deleted booking succesfully"});
};

export const getallbookings = async(req, res, next)=>{
    let bookings;
    try{
        bookings = await Booking.find();
    }catch(err){
        return console.log(err);
    }
    if(!bookings){
        return res.status(309).json({message:"Request failed"});
    }
    return res.status(200).json({bookings});
};

export const getbookingbyid = async(req, res, next)=>{
    const id = req.params.id;
    let booking;
    try{
        booking = await Booking.findById(id);
    }catch(err){
        return console.log(err);
    }
    if(!booking){
        return res.status(310).json({message:"Invalid booking id"});
    }
    return res.status(200).json({booking});
};
