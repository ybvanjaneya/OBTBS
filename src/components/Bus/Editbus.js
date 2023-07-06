import {Button, FormLabel, Typography, Box, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { editbus, getbusbyid } from "../../api-helpers/api-helpers";
import { useNavigate } from "react-router-dom";


const Editbus = ()=>{
    const id= localStorage.getItem("busid");
    const [bus, setbus] = useState({});
    useEffect(()=>{
        getbusbyid(id).then((data)=>setbus(data.bus))
        .catch((err)=>console.log(err));
    }, [id]);
    console.log(bus);
    const navigate = useNavigate();
    const [inputs, setinputs] = useState({number:bus.number, from:bus.from, to:bus.to, date:bus.date, Totalseats:bus.Totalseats, price:bus.price});
    const handleChange = (e)=>{
        setinputs((prevstate)=>({...prevstate,[e.target.name]:e.target.value}))
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(inputs);
        console.log(id);
        editbus({id:id}, {...inputs}).then((res)=>console.log(res)).catch((err)=>alert("Editing unsuccessful"));
        alert("Edited bus successfully");
        navigate("/bus");
    };
    const labelprops = {
        mt:1,mb:1
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <Box width={"50%"} padding={10} margin={"auto"} display={"flex"} flexDirection={"column"} boxShadow={'10px 10px 20px #ccc'}>
                 <Typography textAlign={"center"} fontFamily={"verdana"} variant="h5">
                Edit bus
                </Typography>
                <FormLabel sx={labelprops} >
                    Bus Number
                </FormLabel>
                <TextField value={inputs.number} onChange={handleChange} name="number" variant="standard" margin="normal" type="Number" >

                </TextField>
                <FormLabel sx={labelprops}>
                    From
                </FormLabel>
                <TextField value={inputs.from} onChange={handleChange} name="from" variant="standard" margin="normal" >

                </TextField>
                <FormLabel sx={labelprops}>
                    To
                </FormLabel>
                <TextField value={inputs.to} onChange={handleChange} name="to" variant="standard" margin="normal" >

                </TextField>
                <FormLabel sx={labelprops}>
                    Totalseats
                </FormLabel>
                <TextField value={inputs.Totalseats} onChange={handleChange} name="Totalseats" variant="standard" margin="normal" type="number" >

                </TextField>
                <FormLabel sx={labelprops}>
                    Date
                </FormLabel>
                <TextField value={inputs.date} onChange={handleChange} name="date" variant="standard" margin="normal" type="date">

                </TextField>
                <FormLabel sx={labelprops}>
                    Ticket Price in INR
                </FormLabel>
                <TextField value={inputs.price} onChange={handleChange} name="price" variant="standard" margin="normal" type="number" >

                </TextField>
                <Button type="submit" variant="contained" sx={{width:"30%",margin:"auto", bgcolor:"#2b2d42", ":hover":{bgcolor:"#121217"}}}>
                    Save
                </Button> 
            </Box>
            </form>
        </div>
    );
};

export default Editbus;