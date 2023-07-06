import mongoose from "mongoose";
const Schema = mongoose.Schema;

const busschema = new Schema({
    number:{
        type: Number,
        required: true,
        minlength: 3
    },
    from:{type:String, required:true},
    to:{type:String, required:true},
    Totalseats:{type:Number, required:true},
    bookings:[{
        type: mongoose.Types.ObjectId,
        ref: "Booking"
    }],
    date:{
        type: Date,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    booked:{
        type: Number,
        required: true
    }
});

export default mongoose.model("Buse", busschema);