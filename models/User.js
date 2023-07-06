import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userschema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    bookings:[{
        type: mongoose.Types.ObjectId,
        ref: "Booking"
    }]
});

export default mongoose.model("User", userschema);