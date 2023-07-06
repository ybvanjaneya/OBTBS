import express from "express";
import {addbus, getbuses, getbusbyid, deletebus, updatebus, busbookedupdate, bookedupdate } from "../controls/bus-control";

const busrouter = express.Router();
busrouter.post("/", addbus);
busrouter.get("/", getbuses);
busrouter.get("/:id", getbusbyid);
busrouter.put("/booked/:id", busbookedupdate);
busrouter.delete("/:id", deletebus);
busrouter.put("/:id", updatebus);
busrouter.put("/", bookedupdate);


export default busrouter;