import React, { useState } from "react";
import { Button, Dialog, FormLabel, IconButton, TextField, Typography} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from 'react-router-dom';


import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const labelstyle = {mt: 1, mb: 1};

const Loginform = ({onSubmit, isadmin})=>{
     const [inputs, setinputs] = useState({
        username:"",
        password:"",
        email:""
     });
     const [isSignup, setisSignup] = useState(false);
     const handleChange = (e) =>{
        setinputs((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
     };
     const check = (e)=>{
        console.log(e);
        if(isSignup){
            if(e.target[1].value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
                return true;
            }else{
                alert("not a valid email id");
                return false;
            }
        }
        else{
            return true;
        }
    }
     const handlesubmit = (e) =>{
        e.preventDefault();
        if(!check(e)){
            return;
        }
        onSubmit({inputs, signup: isadmin? false : isSignup});
     };
    return (
        <Dialog PaperProps={{style:{borderRadius:20, minHeight:"95%"}}} open={true}>
            <Box sx={{ml:"auto", padding: 1}}>
                <IconButton LinkComponent={Link} to="/">
                    <CloseRoundedIcon />
                </IconButton>
            </Box>
            { isSignup && <>
                <Typography variant="h4" textAlign={"center"}>
                Signup
                </Typography>
            </>    
            }
            { !isSignup && <>
                <Typography variant="h4" textAlign={"center"}>
                Login
                </Typography>
            </>    
            }
            <form onSubmit={handlesubmit}>
                <Box padding={6} display={"flex"} justifyContent={"center"} flexDirection="column" width={400} margin="auto" alignContent={"center"}>
                    <FormLabel sx={labelstyle}>
                        Username
                    </FormLabel>
                    <TextField value={inputs.username} onChange={handleChange} margin={"normal"} variant="standard" name="username" required sx={{ width: '100%' }}/>
                    { isSignup &&
                        <Box>
                        <FormLabel sx={labelstyle}>
                        Email
                    </FormLabel>
                    <TextField value={inputs.email} onChange={handleChange} margin={"normal"} variant="standard" name="email" required sx={{ width: '100%' }}/>
                    </Box>
                    }
                    <FormLabel>
                        Password
                    </FormLabel>
                    <TextField value={inputs.password} onChange={handleChange} margin="normal" variant="standard" type={"password"} name="password" required sx={{ width: '100%' }}/>
                    {!isadmin && isSignup && <>
                        <Button sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42"}} variant="contained" type="submit" fullWidth>Signup </Button>
                    </>
                    }
                    { !isSignup && <>
                        <Button sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42"}} variant="contained" type="submit" fullWidth>Login </Button>
                    </>
                    }
                    {/* <Button sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42"}} variant="contained" type="submit" fullWidth>Login </Button> */}
                    {!isadmin && <>
                        <Button onClick={()=>setisSignup(!isSignup)} sx={{mt:2, borderRadius:10}}  fullWidth>
                      Switch to  {isSignup ? "Login" : "Signup"}
                     </Button>
                    </> }
                    { !isSignup &&
                        <>
                          <Button sx={{mt:2, ml:'auto', borderRadius:5, width:'50%', textDecorationLine:'underline', fontSize:10}} LinkComponent={Link} to={'/forget'}  >Forget password </Button>
                        </>
                    }
                </Box>
            </form>
        </Dialog>
    );
};
export default Loginform;