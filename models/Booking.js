import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookingschema = new Schema({
    bus:{
        type: mongoose.Types.ObjectId,
        ref: "Buse",
        required: true
    },
    busnumber: {
        type: Number,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    seatnumber:{
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    reserved: [{
        type: Number
    }],
    username: {
        type: String,
        required: true
    }
});

export default mongoose.model("Booking", bookingschema);