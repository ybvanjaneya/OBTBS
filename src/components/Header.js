import React, { useState} from "react";
import {Link} from 'react-router-dom';
import {AppBar, Box, Tabs, Tab, Toolbar, IconButton, Typography} from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
//import { getallbuses } from "../api-helpers/api-helpers";
import { useDispatch, useSelector } from "react-redux";
import { adminactions, useractions } from "../store";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Header = ()=>{
    const dispatch = useDispatch();
    const isadminloggedin= useSelector((state)=>state.admin.isloggedin);
    const isuserloggedin= useSelector((state)=>state.user.isloggedin);
    const [value, setValue] = useState();
    const [select, setSelect] = useState(0);
    const logout = (isadmin)=>{
        dispatch(isadmin? adminactions.logout():useractions.logout());
    }
    return (
        <AppBar position="sticky" sx={{bgcolor:"#2b2d42"}}>
            <Toolbar>
                <Box padding={'1%'} width={'20%'}>
                    <IconButton LinkComponent={Link} to="/" onClick={()=>setValue(0)} >
                    <DirectionsBusIcon style={{color:"white"}}/>
                    </IconButton>
                </Box>
                <Typography marginRight={'auto'} color={'white'}>APSRTC</Typography>
                <Box paddingLeft={'50%'} display={'flex'}>
                    <Tabs textColor={"inherit"} indicatorColor={"secondary"} value={value} onChange={(e,val)=>setValue(val)}>
                        <Tab LinkComponent={Link} to="/" label="Home" value={0} onChange={(e,val)=>setValue(val)} />
                        <Tab LinkComponent={Link} to="/bus" label="Buses"  value={1} onChange={(e,val)=>setValue(val)}/>
                        {!isadminloggedin && !isuserloggedin && (<>
                            <Tab LinkComponent={Link} to="/login" label="Login"  value={2} onChange={(e,val)=>setValue(val)} />
                            <Tab LinkComponent={Link} to="/adminlogin" label="Admin" value={3} onChange={(e,val)=>setValue(val)} />
                        </>)}
                        {isuserloggedin && (
                            <>
                                <Tab onClick={()=>logout(false)} LinkComponent={Link} to="/" label="Logout" value={3} onChange={(e,val)=>setValue(0)} /> 
                                <Tab LinkComponent={Link} to="/user" icon={<AccountCircleIcon sx={{fontSize: '2.5rem'}}/>} value={4} onChange={(e,val)=>setValue(val)} />                  
                            </>
                        )}
                        {isadminloggedin && (
                            <>
                                <Tab LinkComponent={Link} to="/add" label="Add Bus" value={2} onChange={(e,val)=>setValue(val)}/>
                                <Tab onClick={()=>logout(true)} LinkComponent={Link} to="/" label="Signout" value={3} onChange={(e,val)=>setValue(0)}/> 
                                <Tab LinkComponent={Link} to="/admin" icon={<AccountCircleIcon sx={{fontSize: '2.5rem'}}/>} value={4} onChange={(e,val)=>setValue(val)} />                                 
                            </>
                        )}
                         </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
export default Header;
