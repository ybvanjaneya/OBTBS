import React, {} from "react";
import { Box,IconButton } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deletebus} from "../../api-helpers/api-helpers";
import EditIcon from '@mui/icons-material/Edit'; 
import { lightBlue } from "@mui/material/colors";



const Busitem = ({number, from, to, Totalseats, id, date, price, booked})=>{
    const handledelete = (id)=>{
        deletebus(id).then((res)=>console.log(res)).catch((err)=>alert("Deletion unsuccessful"));
        alert("Deleted bus successfully");
        window.location.reload(false);
    };
    
    return (
        <Card sx={{ margin:3, Width: 140, height: 220, color:"#03a9f4", backgroundColor:"lightcyan",borderRadius: 5, ":hover":{boxShadow: "10px 10px 20px #ccc"}}}>
  
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {number}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         <b>from : </b>{from} <br/>
        <b>to : </b> {to} <br/>
         {/* <b>Totalseats : </b>{Totalseats}<br/> */}
         <b>date : </b> {new Date(date).toDateString()} <br/>
         <b>Price : </b> {price} <br/>
         <b>Available: </b> {Totalseats-booked} <br/>
        </Typography>
        
      </CardContent>
      {localStorage.getItem("userid") && 
            <CardActions>
            <Button LinkComponent={Link} to={`/booking/${id}`} sx={{margin:"auto"}} size="small">Book Ticket</Button>
            </CardActions>
      }
      {
        !localStorage.getItem("userid") && !localStorage.getItem("adminid") && <Box margin={2}>
            Login to book
        </Box>
      }
      { localStorage.getItem("adminid") &&
          <CardActions>
              <IconButton color="error" onClick={()=>handledelete(id)} sx={{margin:"auto"}} >
                <DeleteForeverIcon />
              </IconButton>
              <IconButton color="blue" LinkComponent={Link} to="/edit" onClick={()=>localStorage.setItem("busid", id)} sx={{margin:"auto"}} >
                <EditIcon />
              </IconButton>
          </CardActions>
      }
    </Card>
    );
};
export default Busitem;