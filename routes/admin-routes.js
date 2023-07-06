import express from "express";
import {addadmin, loginadmin} from "../controls/admin-control";

const adminrouter = express.Router();

adminrouter.post("/signup", addadmin);
//adminrouter.put("/:id", update);
adminrouter.post("/login", loginadmin);

export default adminrouter;