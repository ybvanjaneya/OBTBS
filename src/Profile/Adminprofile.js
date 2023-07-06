import React, { Fragment, useEffect, useState } from "react";
import { deleteuser, getallusers, getallbookings} from "../api-helpers/api-helpers";
import { Box, List, ListItem, ListItemText, Typography, IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Adminprofile = ()=>{
    const [bookings, setbookings] = useState();
    const [usr, setusr] = useState([]);
    useEffect(()=>{
        getallbookings().then((res)=>setbookings(res.bookings)).catch((err)=>console.log(err));
    },[]);
    console.log("USRS=",usr);
    console.log(bookings);
    const [users, setusers] = useState([]);
    useEffect(()=>{
        getallusers().then((res)=>setusers(res.users)).catch((err)=>console.log(err));
    },[]);
    console.log(users);
    const handledelete = (id)=>{
        deleteuser(id).then((res)=>console.log(res)).catch((err)=>console.log(alert("Unsuccessful deletion")));
        alert("deleted user successfully");
        window.location.reload(false);
    };
    return (
        <Box width={'100%'} display={"flex"} flexDirection={"column"} >
            <Fragment > 
                <Box padding={3}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"} 
                margin={"auto"}
                width={'30%'} display={"flex"}>
                    <AccountCircleIcon sx={{fontSize:"10rem", textAlign:"center", ml:3}} />
                    <Typography padding={1} width={"auto"} textAlign={"center"} border={'1px solid #ccc'} borderRadius={6} >
                        Username : admin
                    </Typography>
                </Box>

            </Fragment>
            <Box >

            {
                users && users.length>0 && (
                    <Fragment>
                        <Box width={'70%'} display={"flex"} flexDirection={"column"} >
                        <Typography variant="h4" fontFamily={"verdana"} textAlign={"center"}>
                        All Users
                        </Typography>
                        <Box margin={"auto"}
                            display={"flex"}
                            flexDirection={"column"}
                            width={"80%"}
                        >
                            <List>
                                {users.map((user, index)=>(
                            // #00d386
                                    <ListItem sx={{ margin:3, Width: 140, color:"black", backgroundColor:"#00d386",borderRadius: 5, ":hover":{boxShadow: "10px 10px 20px #ccc"}}}>
                                        <ListItemText sx={{margin:1,width:"auto",textAlign:"left"}} >
                                            Username: {user.username}<br/>
                                        </ListItemText>
                                        <ListItemText sx={{margin:1,width:"auto",textAlign:"left"}} >
                                            Email: {user.email}<br/>
                                        </ListItemText>
                                        <IconButton color="error" onClick={()=>handledelete(user._id)}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        </Box>
                    </Fragment>
                )
            }
            </Box>
            <Box>
            
            {
                bookings && bookings.length>0 && (
                    <Fragment>
                        <Box width={'70%'} display={"flex"} flexDirection={"column"} >
                        <Typography variant="h4" fontFamily={"verdana"} textAlign={"center"}>
                        All Bookings
                        </Typography>
                        <Box margin={"auto"}
                            display={"flex"}
                            flexDirection={"column"}
                            width={"80%"}
                        >
                            <List>
                                {bookings.map((booking, index)=>(
                                    <ListItem sx={{ margin:3, Width: 140, height: 200, color:"#03a9f4", backgroundColor:"lightcyan",borderRadius: 5, ":hover":{boxShadow: "10px 10px 20px #ccc"}}}>
                                        <ListItemText sx={{margin:1,width:"auto",textAlign:"left", color:'green' }} >
                                            <b>Date:</b> {new Date(booking.date).toDateString()}<br/>
                                            <b>No. of seats:</b> {booking.seatnumber}<br/>
                                            <b>Bus Number:</b> {booking.busnumber}<br/>
                                            <b>From:</b> {booking.from} <br/>  <b>To:</b> {booking.to} <br/>
                                            <b>Amount paid:</b> {booking.fare} <br />
                                            <b>Seat numbers:</b> {booking.reserved && booking.reserved.map((SN, index)=><text>{SN}, </text>)} <br/>
                                            <b>Booked by :</b> {booking.username} <br />
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        </Box>
                    </Fragment>
                )
            }
            </Box>
        </Box>
    );
};


export default Adminprofile;