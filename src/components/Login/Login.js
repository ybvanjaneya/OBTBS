import React from "react";
import { useDispatch } from "react-redux";
import { senduserloginrequest, sendusersignuprequest } from "../../api-helpers/api-helpers";
import Loginform from "./Loginform";
import { useractions } from "../../store";
import { useNavigate } from "react-router-dom";


const Login = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onresreceived = (data) => {
        console.log(data);
        dispatch(useractions.login());
        localStorage.setItem("userid", data.id);
        alert("Authentication Successful");
        navigate("/");
    };
    const Invalid = (err)=>{
        alert("Invalid Credentials");
    };
    const getdata = (data) =>{
        console.log(data);
        if(!data.signup){
            senduserloginrequest(data.inputs, data.signup)
            .then((onresreceived)).catch((err)=>Invalid);
        }
        else {
            sendusersignuprequest(data.inputs, data.signup)
            .then((onresreceived)).catch((err)=>Invalid);
        }
        // .then((res)=>
        //     console.log(res)
        // )
        // .then(()=>dispatch(useractions.login()))
        
    };
    return (
        <div>
        <Loginform onSubmit={getdata} isadmin={false}/>

        </div>
    );
};
export default Login;