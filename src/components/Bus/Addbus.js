import {Button, FormLabel, Typography, Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { addbus } from "../../api-helpers/api-helpers";
import { useNavigate } from "react-router-dom";


const Addbus = ()=>{
    const dat = new Date();
    const navigate = useNavigate();
    const [inputs, setinputs] = useState({number:1000, from:"", to:"", date:"", Totalseats:0, price:0});
    const handleChange = (e)=>{
        setinputs((prevstate)=>({...prevstate,[e.target.name]:e.target.value}))
    };
    const check = (e)=>{
        console.log(e);
        if(e.target[0].value.match(/^(?:([0-9]{3}|[0-9]{4})|[0-9]{5})$/)){
            if(e.target[3].value > 0){
                if(e.target[5].value > 0){
                    if(new Date(e.target[4].value) < dat){
                        alert("Date incorrect");
                        return false;
                    }
                    else{
                        return true;
                    }
                }else{
                    alert("Ticket price value incorrect");
                    return false;
                } 
            }else{
                alert("Total seats value incorrect");
                return false;
            }
        }else{
            alert("not a valid bus number");
            return false;
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!check(e)){
            return;
        }
        console.log(inputs);
        addbus({...inputs}).then((res)=>alert("Added bus successfully")).catch((err)=>(alert("Unsuccessful")));
       // alert("Added bus successfully");
        navigate("/bus");
    };
    const labelprops = {
        mt:1,mb:1
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <Box width={"50%"} padding={10} margin={"auto"} display={"flex"} flexDirection={"column"} boxShadow={'10px 10px 20px #ccc'}>
                 <Typography textAlign={"center"} fontFamily={"verdana"} sx={{textDecoration: 'underline'}} variant="h4">
                ADD NEW BUS
                </Typography>
                <FormLabel sx={labelprops}>
                    Bus Number (100~input~99999)
                </FormLabel>
                <TextField value={inputs.number} onChange={handleChange} name="number" variant="standard" margin="normal" type="Number" required >

                </TextField>
                <FormLabel sx={labelprops}>
                    From
                </FormLabel>
                <TextField value={inputs.from} onChange={handleChange} name="from" variant="standard" margin="normal" required >

                </TextField>
                <FormLabel sx={labelprops}>
                    To
                </FormLabel>
                <TextField value={inputs.to} onChange={handleChange} name="to" variant="standard" margin="normal" required>

                </TextField>
                <FormLabel sx={labelprops}>
                    Totalseats
                </FormLabel>
                <TextField value={inputs.Totalseats} onChange={handleChange} name="Totalseats" variant="standard" margin="normal" type="number" required >

                </TextField>
                <FormLabel sx={labelprops}>
                    Date
                </FormLabel>
                <TextField value={inputs.date} onChange={handleChange} name="date" variant="standard" margin="normal" type="date" required>

                </TextField>
                <FormLabel sx={labelprops}>
                    Ticket Price in INR
                </FormLabel>
                <TextField value={inputs.price} onChange={handleChange} name="price" variant="standard" margin="normal" type="number" required >

                </TextField>
                <Button type="submit" variant="contained" sx={{width:"30%",margin:"auto", bgcolor:"#2b2d42", ":hover":{bgcolor:"#121217"}}}>
                    Add Bus
                </Button> 
            </Box>
            </form>
        </div>
    );
};

export default Addbus;