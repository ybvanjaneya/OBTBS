import React from "react";
import { useDispatch } from "react-redux";
import { adminloginrequest } from "../../api-helpers/api-helpers";
import Loginform from "../Login/Loginform";
import { adminactions } from "../../store";
import { useNavigate } from "react-router-dom";


const Admin = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const onresreceived = (data) => {
        console.log(data);
        dispatch(adminactions.login());
        localStorage.setItem("adminid", data.id);
        localStorage.setItem("token", data.token);
        alert("Login successful");
        navigate("/");
    };
     const getdata = (data) =>{
        console.log("Admin",data);
        adminloginrequest(data.inputs).then(onresreceived)
        // .then((res)=>console.log(res))
        // .then(()=>dispatch(adminactions.login()))
        .catch((err)=>alert("Invalid Credentials"));
     };
    return (
        <div><Loginform onSubmit={getdata} isadmin={true}/></div>
    );
};
export default Admin;
