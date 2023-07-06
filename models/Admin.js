import mongoose from "mongoose";

const Schema = mongoose.Schema;
const adminschema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

export default mongoose.model("Admin", adminschema);