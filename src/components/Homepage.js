import React, { useEffect, useState } from 'react';
import { Box, Button} from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getallbuses, searchbus } from '../api-helpers/api-helpers';
import Busitem from './Bus/Busitem';
import LoopIcon from '@mui/icons-material/Loop';
import classes from './Homepage.module.css';

const Homepage = () => {
    const [DAT, setDAT] = useState([]);
    const [D, setD] = useState();
    const [buse, setbuses] = useState([]);
    useEffect(() => {
        getallbuses().then((res) => setbuses(res.buses)).catch((err) => console.log(err));
    }, [])
    const [F, setF] = useState();
    const [T, setT] = useState();
    let froms = [];
    let tos = [];
    useEffect(() => {
        { buse && buse.map((bus, index) => (froms[index] = bus.from, tos[index] = bus.to)) }
    }, [buse, froms, tos]);
    console.log(froms);
    console.log(tos);
//pavan simma
    const handlesubmit = () => {
        const data = { from: F, to: T, date: D };
        if (!F && !T && !D) {
            alert("Enter any data");
            return;
        }
        console.log(data);
        searchbus(data).then((res) => setDAT(res.buses)).catch((err) => console.log(err));
    };


    return (
        <div className={classes.base}>
            <div className={classes.bgImg}></div>
        <Box className={classes.container} >
            <div className={classes.searchcard} >
                <Box margin={"auto"} width="90%" display={"flex"} flexDirection={"row"} justifyContent={'space-between'} marginBottom={"4vh"} marginTop={"4vh"}>
                    <Box sx={{ backgroundColor: "#F2F2F0", borderRadius: "5px" }}>
                        <Autocomplete
                            disablePortal
                            id="from"
                            options={froms}
                            sx={{ width: 275 }}
                            onChange={(e, dat) => setF(dat)}
                            renderInput={(inputs) => <TextField {...inputs} name="from" label="from" />}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#FFF', marginTop: "10px" }}>
                        <LoopIcon sx={{ color: 'red' }} />
                    </Box>
                    <Box sx={{ backgroundColor: "#F2F2F0", borderRadius: "5px" }}>
                        <Autocomplete
                            disablePortal
                            id="to"
                            options={tos}
                            sx={{ width: 275 }}
                            onChange={(e, dat) => setT(dat)}
                            renderInput={(params) => <TextField {...params} name="to" label="to" />}
                        />
                    </Box>
                </Box>
                <Box margin={"auto"} width="90%" display={'flex'} flexDirection={'column'} marginBottom={"4vh"} sx={{ backgroundColor: "#F2F2F0", borderRadius: "5px" }} >
                    {/* <FormLabel sx={{ fontFamily: "verdana", color: "#898989", backgroundColor: "inherit" }} >Date of journey</FormLabel> */}
                    <TextField onChange={(e) => setD([e.target.name] = e.target.value)} name="date" variant="standard" margin="normal" type="date" sx={{ backgroundColor: "inherit" }} >
                    </TextField>
                </Box>
                <Box margin={'auto'} marginBottom={"2vh"}>
                    <Button type='submit' onClick={handlesubmit} sx={{ backgroundColor: "#F24141", color: "white", borderRadius: "0%", width: "15vw", height: "8vh", fontSize: "1.2rem" }}>Search bus</Button>
                </Box>
            </div>
            <div className={classes.text}>
                <p style={{ color: "#590A18", fontSize: "4rem", fontWeight: "700", margin: "0" }}>Get On <span style={{ color: "#000000", fontSize: "5.5rem" }}>Board.</span></p>
                <p style={{ color: "white", fontSize: "1.8rem", fontWeight: "600", margin: "0" }}>with Online Bus Ticket booking system</p>
                <p style={{ color: "#FF0000", fontSize: "2.4rem", fontWeight: "700", marginTop: "10px" }}>The smarter way to travel</p>
            </div>
        </Box>
        <div className={classes.list}>
            <Box width={"80%"} margin="auto" display={"flex"} justifyContent="center" flexWrap={"wrap"}>
                    {DAT && DAT.map((bus, index) => <Busitem key={index} number={bus.number} from={bus.from} to={bus.to} Totalseats={bus.Totalseats} id={bus._id} date={bus.date} price={bus.price} booked={bus.booked} />)}
                </Box>
            </div>
        </div>
    );
};

export default Homepage;


// https://images7.alphacoders.com/317/317196.jpg

{/* <Box width={"100%"} height={"100%"}  margin={'auto'} sx={mystyle} display={'flex'} flexDirection={'column'} flexGrow={"auto"}>
            <h1 style={{color:"crimson", fontFamily:"verdana", margin:'auto', fontSize:'300%'}}>APSRTC</h1>
            <Box margin={"auto"} display={"flex"} flexDirection={"row"} >
            <Box margin={"auto"} width="30%" padding={6}  >
            <Autocomplete
                disablePortal
                id="from"
                options={froms}
                sx={{ width: 300 }}
                onChange={(e,dat)=>setF(dat)}
                renderInput={(inputs) =>  <TextField {...inputs} name="from" label="from" />}
                
            />
            </Box>
            <Box margin={"auto"} width="30%" padding={6} >
            <Autocomplete
                disablePortal
                id="to"
                options={tos}
                sx={{ width: 300 }}
                onChange={(e,dat)=>setT(dat)}
                renderInput={(params) => <TextField {...params }  name="to" label="to"/>}
                
            />
            </Box>
            </Box>
            <Box margin={"auto"} width="30%"  paddingTop={6} display={'flex'} flexDirection={'column'} sx={{backgroundColor:"lightcyan", borderRadius:4}} >
                <FormLabel sx={{fontFamily:"verdana", color:"black", backgroundColor:"inherit"}} >Date of journey</FormLabel>
                <TextField onChange={(e)=>setD([e.target.name]=e.target.value)}  name="date" variant="standard" margin="normal" type="date" sx={{backgroundColor:"inherit"}}>

                </TextField>
            </Box>
            <Box margin={'auto'}>
                <Button type='submit' onClick={handlesubmit} sx={{backgroundColor:"coral", color:"white"}}>Search bus</Button>
            </Box>
            <Box width={"80%"} margin="auto" display={"flex"} justifyContent="center" flexWrap={"wrap"}>
                {DAT && DAT.map((bus, index)=><Busitem key={index} number={bus.number} from={bus.from} to={bus.to} Totalseats={bus.Totalseats} id={bus._id} date={bus.date} price={bus.price}/>)}
            </Box> 
        </Box> */}


// https://img.freepik.com/premium-vector/flat-design-bus-travel-background_23-2147639854.jpg?w=2000