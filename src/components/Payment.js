import React from "react";
import { newbooking } from "../api-helpers/api-helpers";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


const Payment = ({seatnumber, id, date, number, from, to})=>{
    const navigate = useNavigate();
    const handleSubmit = ()=>{
        console.log({seatnumber:seatnumber,bus:id, date:date, busnumber:number, from:from, to:to});
        newbooking({seatnumber:seatnumber,bus:id, date:date, busnumber:number, from:from, to:to}).then((res)=>console.log(res))
        .catch((err)=>alert("Booking unsuccessful"));
        alert("Booking succesful");
        //navigate("/user");
    };
    
    return (
        <div>
            Payment Page!!
            <form>
                <Button sx={{mt:2}} type="submit" onClick={handleSubmit}>
                    Pay Now
                </Button>
            </form>
        </div>
    );
};
export default Payment;