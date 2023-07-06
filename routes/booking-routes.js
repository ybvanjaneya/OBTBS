import express from "express";
import {newbooking, deletebooking, getallbookings, getbookingbyid} from "../controls/booking-control";

const bookingrouter = express.Router();

bookingrouter.post("/", newbooking);
bookingrouter.delete("/:id", deletebooking);
bookingrouter.get("/", getallbookings);
bookingrouter.get("/:id", getbookingbyid);

export default bookingrouter;