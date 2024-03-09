import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';

import EachHotel from './AdminDashboard/EachHotel';
import AdminHome from './AdminDashboard/adminHome';
import AdminLogin from './AdminDashboard/AdminLoginPage';
import UploadScreen from './AdminDashboard/UploadScreen';
import EditDishScreen from './AdminDashboard/EditDishScreen';
import DisplayDishes from './AdminDashboard/DisplayDishes';
import PreviousOrders from './ClientDashBoard/PreviousOrders';
import LoginPage from './ClientDashBoard/LoginPage';
import Navbar from './ClientDashBoard/Navbar';
import EntryPage from './ClientDashBoard/EntryPage';

import AdminSignup from './AdminDashboard/AdminSignup';
import HotelRegister from './AdminDashboard/HotelRegister';

import AdminHotelDisplay from './AdminDashboard/AdminHotelDisplay';

function App() {
  const [dish, setDish] = useState([]);
  const [show, setShow] = useState(true);
  const [warn, setWarn] = useState(false);
  const [id,setId]=useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
 
  

  const handleClick = (item) => {
    let isPresent = false;
    dish.forEach((product) => {
      if (item._id === product._id) {
        isPresent = true;
      }
    });
    if (isPresent) {
      setWarn(true);
      setTimeout(() => {
        setWarn(false);
      }, 2000);
    }else{
      setDish([...dish, item]);
    }

  };
  
  const handleChange = (item, d) => {
    let ind = -1;
    dish.forEach((data, index) => {
      if (data._id === item._id) {
        ind = index;
      }
    });
    const tempArr = dish;
    tempArr[ind].quantity += d;
  
    if (tempArr[ind].amount === 0) {
      tempArr.splice(ind, 1);
    }
    setDish([...tempArr]);
  };
  
  return (
    <div className="App">
    
      
     <Navbar size={dish.length} setShow={setShow} setDish={setDish} id={id} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
      
      
        

      <Routes>
      <Route path="/" element={<LoginPage setId={setId} setIsLoggedIn={setIsLoggedIn} setDish={setDish}/>} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/PreviousOrders" element={<PreviousOrders id={id}/>}/>
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/Admin/hotel/:id" element={<EachHotel />} />
     
        <Route path="/HotelDisplay" element={<AdminHotelDisplay />} />
       
        <Route path="/Admin/HotelRegister" element={<HotelRegister />} />
        
        <Route path="/hotel/:hotelId" element={<AdminHome/>} />
        <Route path="/hotel/:hotelId/UploadScreen" element={<UploadScreen/>} />
        <Route path="/EditDishScreen" element={<EditDishScreen />} />
        <Route path="/hotelRegister" element={<HotelRegister/>}/>
        <Route path="/DisplayDishes/:hotelId" element={<DisplayDishes dish={dish} warn={warn} setDish={setDish} handleChange={handleChange} show={show} handleClick={handleClick}/>} />
        <Route path="/adminSignup/:hotelId" element={<AdminSignup />} />
        <Route path="/adminLogin/:hotelId" element={<AdminLogin />} />      
        <Route path="/EntryPage/:hotelId" element={<EntryPage dish={dish} warn={warn} setDish={setDish} handleChange={handleChange} show={show} handleClick={handleClick} />} />

      </Routes>
    </div>
  );
}

export default App;
