import { Typography, Box, FormLabel, TextField, Button } from "@mui/material";
import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getbusdetails, newbooking, updatebookedbus } from "../../api-helpers/api-helpers";
//import Payment from "../Payment";
import visa from './visa.png';

const Booking = ()=>{
    const navigate = useNavigate();
    //let pay = false;
    const id = useParams().id;
    const [bus, setbus] = useState();
    const [inputs, setinputs] = useState({seatnumber:0});
    const [fare, setfare] = useState(0);
    console.log(id);
    const dat = new Date();
    console.log(dat);
    useEffect(()=>{
        getbusdetails(id)
        .then((res)=>setbus(res.bus))
        .catch((err)=>console.log(err));
    }, [id]);
    const handleChange = (e)=>{
        console.log(e);
        setinputs((prevState)=>({...prevState,[e.target.name]:e.target.value}))
        setfare(bus.price*e.target.value);
        console.log(fare);
    };
    const check = (e)=>{
        console.log(e);
        if(e.target[2].value.match(/^(?:4[0-9]{15})$/)){
            if(e.target[3].value.match(/^(?:[0-9]{3})$/)){
                if(new Date(e.target[4].value) < dat){
                    alert("Expiry date incorrect");
                    return false;
                }
                else{
                    return true;
                }
            }else{
                alert("not a valid cvv number");
                return false;
            }
        }else{
            alert("not a valid card number");
            return false;
        }
    };
    const reserved = [];

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(inputs);
        if(!check(e)){
            return;
        }
        if(bus.Totalseats-bus.booked<inputs.seatnumber){
            alert("seats not available");
        }else if(inputs.seatnumber<=0){
            alert("Invalid number of seats");
        }else{
            if(new Date(bus.date) < dat){
                alert("Can't book for previous date");
            }
            else{
                console.log(inputs);
                for(let i=0; i<inputs.seatnumber; i++){
                    reserved[i] = Number(bus.booked) + Number(i) + 1;
                }
                newbooking({...inputs,bus:bus._id, date:bus.date, busnumber:bus.number, from:bus.from, to:bus.to, fare:fare, reserved:reserved}).then((res)=>console.log(res))
                .catch((err)=>alert("Booking unsuccessful"));
                let data={booked:Number(bus.booked)+Number(inputs.seatnumber)};
                updatebookedbus({id:bus._id},data).then((res)=>console.log(res)).catch((err)=>console.log(err));
                alert("Booking succesful");
                navigate("/user");
            }
        }
    };
    
    return (
        <div>
           {bus && <Fragment>
                <Typography margin={'auto'} padding={3} fontFamily="georgia" varient="h4" textAlign={"center"} sx={{bgcolor:"inherit"}} width={"50%"} >
                    Book tickets of bus:<b> {bus.number} </b><br/>
                    From: {bus.from}<br/>
                    To: {bus.to}<br/>
                    Date: {new Date(bus.date).toDateString()}<br/>
                    Available: ({bus.Totalseats - bus.booked}) seats <br/>
                    Price: {bus.price}<br/>
                </Typography>
                <Box width={"50%"} paddingTop={3} margin={'auto'} sx={{bgcolor:"lavender"}}>
                <form onSubmit={handleSubmit} >
                    <Box padding={5}
                    margin={"auto"} 
                    display="flex"
                    flexDirection={"column"} >
                        <FormLabel>
                            No. of tickets
                        </FormLabel>
                        <TextField 
                        required
                        value={inputs.seatnumber}
                        onChange={handleChange}
                        name="seatnumber"
                        type={"Number"} 
                        margin="normal"
                        variant="standard" 
                         />
                    <Typography padding={3} fontFamily="georgia" varient="h4" textAlign={"center"}>
                        Total Fare: {fare} <br />
                        <b>Payment Details</b>
                    </Typography>
                    <FormLabel>
                            Card holder name
                        </FormLabel>
                        <TextField 
                        name="cardholder"
                        type={"text"} 
                        margin="normal"
                        variant="standard" required/>
                    <img src={visa} width={"30%"}></img>
                    <FormLabel>
                            Card number
                        </FormLabel>
                        <TextField 
                        name="cardnumber"
                        type={"Number"} 
                        margin="normal"
                        variant="standard" required/>
                    <FormLabel>
                            CVV
                        </FormLabel>
                        <TextField 
                        name="cvv"
                        type={"Number"} 
                        margin="normal"
                        variant="standard" required/>
                    <FormLabel>
                            Expiry date
                        </FormLabel>
                        <TextField 
                        name="expdate"
                        type={"date"} 
                        margin="normal"
                        variant="standard" required/>
                        <Button sx={{mt:2, bgcolor:"green"}} type="submit" variant="contained" >
                            Book Now
                        </Button>
                    </Box>
                </form>
                </Box>
            </Fragment>
            }
        </div>
    );
}

export default Booking;