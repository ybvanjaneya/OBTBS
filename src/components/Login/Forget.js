import React from "react";
import { useState } from "react";
import { Button, Dialog, FormLabel, IconButton, TextField, Typography} from "@mui/material";
import { Box } from "@mui/system";
import { Link, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { getusername, senduserupdaterequest } from "../../api-helpers/api-helpers";

const labelstyle = {mt: 1, mb: 1};

function generateRandomToken() {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var token = "";
    for (var i = 0; i < 4; i++) {
        var randomIndex = Math.floor(Math.random() * alphabet.length);
        token += alphabet[randomIndex];
    }
    return token;
}
const r = generateRandomToken();

const Forget = ()=>{
    const navigate = useNavigate();
    const [inputs, setinputs] = useState({
        password:"",
        email:"",
        token:""
     },[]);
    
     const [isuser, setisuser] = useState("");
     const [isid, setisid] = useState("");
     const [istoken, setistoken] = useState(false);
    var temp = {
        to_name : localStorage.getItem("forgetuser"),
        html_message : "Your Token : ",
        tkn : r,
        subject : "Verify your email",
        to_email : localStorage.getItem("forgetemail"),
        from_name : "APSRTC"
    };
    function sendEmail() {
    // temp.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
    console.log(temp);
    emailjs.send(`service_cxgydkb`, `template_el9p5l8`, temp, `rleDP9eS6hWLfzUYl`)
        .then((result) => {
            //window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
            alert("Email sent");
            console.log(result);
        }, (error) => {
            console.log(error.text);
        });
    };
    const handleChange = (e) =>{  //email
        setinputs((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
        console.log(e);
        getusername({email:e.target.value}).then((res)=>(setisuser(res.user.username),setisid(res.user._id))).catch((setisuser("no user"),setisid("")));
        localStorage.setItem("forgetemail", e.target.value);
     };
     const handle = (e) =>{ //token
        setinputs((prevState)=>({
             ...prevState,
            [e.target.name] : e.target.value,
        }));
        console.log(e);
        //console.log(r);
        console.log(e.target.value);
        if(e.target.value===r){
            setistoken(true);
        }
        else{
            setistoken(false);
        }
     };
     const handlechange = (e) =>{ //password
        setinputs((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
        console.log(e.target.value);
     };
     const check = (e)=>{
        console.log(e);
        if(e.target[0].value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            return true;
        }else{
            alert("not a valid email id");
            return false;
        }
    }
     const handlesubmit = (e) =>{
        e.preventDefault();
        if(!check(e)){
            return;
        }
        console.log(inputs, isuser);
        console.log(isid);
        localStorage.setItem("forgetid", isid);
        senduserupdaterequest({username: isuser, password: inputs.password, email:inputs.email}).then((res)=>console.log(res)).catch((err)=>console.log(err));
        alert("Password reset Successful");
        navigate("/login");
     };
     
    return(
        <Dialog PaperProps={{style:{borderRadius:20, minBlockSize:"100%"}}} open={true}>
            <Box sx={{ml:"auto", padding: 1}}>
                <IconButton LinkComponent={Link} to="/">
                    <CloseRoundedIcon sx={{color:'red'}}/>
                </IconButton>
            </Box>
            <Typography variant="h4" textAlign={"center"}>
            Reset Password
            </Typography>
            
            <form onSubmit={handlesubmit}>
                <Box padding={6} display={"flex"} justifyContent={"center"} flexDirection="column" width={400} margin="auto" alignContent={"center"}>
                    
                    <Box>
                    <FormLabel sx={labelstyle}>
                    Enter your authentication Email
                    </FormLabel>
                    <TextField value={inputs.email} onChange={handleChange} margin={"normal"} variant="standard" name="email" required fullWidth />
                    </Box>

                    <FormLabel sx={labelstyle}>
                        Username : {isuser}
                    </FormLabel>
                    {/* <TextField value={inputs.username} onChange={handleChange} margin={"normal"} variant="standard" name="username" required /> */}
                    { isuser && localStorage.setItem("forgetuser", isuser) }
                    
                    <FormLabel>
                       Verification Token (check your email)
                    </FormLabel>
                    <TextField value={inputs.token} onChange={handle} margin="normal" variant="standard" type={"password"} name="token" required/>
                    
                    { istoken && <>
                        <FormLabel>
                       New Password
                    </FormLabel>
                    <TextField value={inputs.password} onChange={handlechange} margin="normal" variant="standard" type={"password"} name="password" required/>
                    </>
                    }
                    
                    { isuser && !istoken && <><Button onClick={sendEmail} >Click here to get token in email</Button></>}
                    { isuser && istoken  &&  <>
                        <Button sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42"}} variant="contained" type="submit" fullWidth>Submit </Button>
                        
                    </>
                    }
                </Box>
            </form>
        </Dialog>
    );
};

export default Forget;