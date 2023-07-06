import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getallbuses } from "../../api-helpers/api-helpers";
import Busitem from "./Busitem";
const Bus = ()=>{
    const [buses, setbuses] = useState([]);
    useEffect(()=>{
        getallbuses().then((data)=>setbuses(data.buses))
        .catch((err)=>console.log(err));
    }, []);
    console.log(buses);
    
    return (
        <Box margin={"auto"} marginTop={0}>
            <Typography variant={"h4"} width={"100%"} bgcolor="lightgreen" textAlign={"center"} padding={2}>All Buses</Typography>
            <Box width={"80%"} margin="auto" display={"flex"} justifyContent="center" flexWrap={"wrap"}>
                {buses && buses.map((bus, index)=><Busitem key={index} number={bus.number} from={bus.from} to={bus.to} Totalseats={bus.Totalseats} id={bus._id} date={bus.date} price={bus.price} booked={bus.booked} />)}
            </Box> 
        </Box>
    );
};
export default Bus;