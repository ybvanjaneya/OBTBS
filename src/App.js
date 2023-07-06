// import logo from './logo.svg';
// import './App.css';
import{Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Bus from "./components/Bus/Bus";
import Addbus from "./components/Bus/Addbus";
import Editbus from "./components/Bus/Editbus";
import Admin from "./components/Admin/Admin";
import Adminprofile from './Profile/Adminprofile';
import Login from "./components/Login/Login";
import Booking from "./components/Bookings/Booking";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import { adminactions, useractions } from './store';
import Userprofile from './Profile/Userprofile';
//import Payment from './components/Payment';
import Forget from './components/Login/Forget'
//import Verification from './components/Login/Verification'



function App() {
  const dispatch = useDispatch();
  const isadminloggedin= useSelector((state)=>state.admin.isloggedin);
  const isuserloggedin= useSelector((state)=>state.user.isloggedin);
  console.log("isadminloggedin", isadminloggedin);
  console.log("isuserloggedin", isuserloggedin);
  useEffect(()=>{
    if(localStorage.getItem("userid")){
      dispatch(useractions.login());
    }else if(localStorage.getItem("adminid")){
      dispatch(adminactions.login());
    }
  },[dispatch])
  return (
    <div>
      <Header/>
    <section>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/adminlogin' element={<Admin />} />
        <Route path='/bus' element={<Bus />} />
        <Route path='/login' element={<Login />} />
        <Route path='/user' element={<Userprofile />} />
        <Route path='/admin' element={<Adminprofile />} />
        <Route path='/add' element={<Addbus />} />
        <Route path='/edit' element={<Editbus />} />
        <Route path='/booking/:id' element={<Booking />} />
        <Route path='/forget' element={<Forget />} />
        {/* <Route path='/verify' element={<Verification />} /> */}
      </Routes>
    </section>

    </div>
    
  );
}

export default App;

/*
<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/