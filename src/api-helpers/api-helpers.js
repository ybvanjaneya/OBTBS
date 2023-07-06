import axios from 'axios';


export const getallbuses = async()=>{
    const res = await axios.get("/bus")
    .catch((err)=>console.log(err));
    
    if((res.status !== 200)) {
        return console.log("No Data");
    }
    const data = await res.data;
    return data;
};

export const senduserloginrequest = async(data, signup) =>{
    const res = await axios.post(`/user/${signup? "signup" : "login"}`, {
        username: data.username,
        password: data.password,
    }).catch((err)=>alert("Invalid username or password"));
    if(res.status!==200){
        console.log("Unexpected error occured");
    };
    const resdata = await res.data;
    return resdata;
};

export const sendusersignuprequest = async(data, signup) =>{
    const res = await axios.post(`/user/${signup? "signup" : "login"}`, {
        username: data.username,
        password: data.password,
        email: data.email
    }).catch((err)=>alert("user already exists"));
    if(res.status!==200){
        console.log("Unexpected error occured");
        return null;
    };
    const resdata = await res.data;
    return resdata;
};

export const senduserupdaterequest = async(data) =>{
    const id = localStorage.getItem("forgetid");
    const res = await axios.put(`/user/${id}`, {
        username: data.username,
        password: data.password,
        email: data.email
    }).catch((err)=>alert("Error occurred while updating password"));
    if(res.status!==200){
        console.log("Unexpected error occured");
        return null;
    };
    const resdata = await res.data;
    return resdata;
};

export const adminloginrequest = async(data) =>{
    const res = await axios.post("/admin/login", {
        username: data.username,
        password: data.password
    }).catch((err)=>console.log(err));
    if(res.status!==200){
        console.log("Unexpected error occured");
    }
    const resdata = await res.data;
    return resdata;
};

export const getbusdetails = async(id)=>{
    const res = await axios.get(`/bus/${id}`).catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("Unexpected Error");
    }
    const resdata = await res.data;
    return resdata;
};

export const newbooking = async(data)=>{
    const res = await axios.post('/booking', {
        bus: data.bus,
        busnumber: data.busnumber,
        from: data.from,
        to: data.to,
        seatnumber: data.seatnumber,
        date: data.date,
        user: localStorage.getItem("userid"),
        fare: data.fare,
        reserved: data.reserved
    }).catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("Unexpected Error");
    }
    
    const resdata = await res.data;
    return resdata;
};

export const getbookingsofuser = async()=>{
    const id = localStorage.getItem("userid");
    const res = await axios.get(`/user/bookings/${id}`).catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("Unexpected Error");
    }
    const resdata = await res.data;
    return resdata;
};

export const getuserbyid = async()=>{
    const id = localStorage.getItem("userid");
    const res = await axios.get(`/user/${id}`).catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("Unexpected Error");
    }
    const resdata = await res.data;
    return resdata;
};

export const getuserbybooking = async(id)=>{
    const res = await axios.get(`/user/${id}`).catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("Unexpected Error");
    }
    const resdata = await res.data;
    return resdata;
};


export const getusername = async(data) => {
    const res = await axios.put('/user/email/username', {
        email:data.email
    }).catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("Unexpected Error");
    }
    const resdata = await res.data;
    return resdata;
};

export const getbusbyid = async(id)=>{
    const res = await axios.get(`/bus/${id}`).catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("Unexpected Error");
    }
    const resdata = await res.data;
    return resdata;
};

export const deletebooking = async(id)=>{
    const res = await axios.delete(`/booking/${id}`).catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("Unexpected Error");
    }
    const resdata = await res.data;
    return resdata;
};

export const addbus = async(data)=>{
    const dat = new Date();
    if(new Date(data.date)<dat){
        alert("can't add bus for past dates");
        return null;
    }
    const res = await axios.post("/bus",{
        number: data.number,
        from: data.from,
        to : data.to,
        Totalseats: data.Totalseats,
        date: data.date,
        price: data.price
    }, {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).catch((err)=>console.log(err));

    if(res.status!==200){
        return console.log("Unexpected Error");
    }
    const resdata = await res.data;
    return resdata;
};

export const getallusers = async()=>{
    const res = await axios.get("/user").catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("Unexpected Error");
    }
    const resdata = await res.data;
    return resdata;
};
export const deleteuser = async(id)=>{
    const res = await axios.delete(`/user/${id}`).catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("Unexpected Error");
    }
    const resdata = await res.data;
    return resdata;
};

export const getallbookings = async()=>{
    const res = await axios.get("/booking").catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("Unexpected Error");
    }
    const resdata = await res.data;
    return resdata;
};

export const deletebus = async(id)=>{
    const res = await axios.delete(`/bus/${id}`).catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("Unexpected Error");
    }
    const resdata = await res.data;
    return resdata;
};

export const editbus = async({id},data)=>{
    const res = await axios.put(`/bus/${id}`,{
        number: data.number,
        from: data.from,
        to: data.to,
        Totalseats: data.Totalseats,
        date: data.date,
        price: data.price
    }).catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("Unexpected Error!!");
    }
    const resdata = await res.data;
    return resdata;
};

export const updatebookedbus = async({id},data)=>{
    const res = await axios.put(`/bus/booked/${id}`,{
        booked: data.booked
    }).catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("Unexpected Error!!");
    }
    const resdata = await res.data;
    return resdata;
};

export const searchbus = async(data)=>{
    const res = await axios.put("/search",{
        from:data.from,
        to:data.to,
        date:data.date
    }).catch((err)=>console.log(err));
    if(res.status!==200){
        return console.log("Unexpected error");
    }
    const resdata = await res.data;
    return resdata;
};