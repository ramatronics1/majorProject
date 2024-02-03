import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import StudentLogin from './ClientDashBoard/StudentLogin';

import AdminHome from './AdminDashboard/adminHome';
import AdminLogin from './AdminDashboard/LoginPage';
import UploadScreen from './AdminDashboard/UploadScreen';
import EditDishScreen from './AdminDashboard/EditDishScreen';
import DisplayDishes from './AdminDashboard/DisplayDishes';
import ViewDish from './ClientDashBoard/ViewDish';
import LoginPage from './ClientDashBoard/LoginPage';
import Navbar from './ClientDashBoard/Navbar';
import EntryPage from './ClientDashBoard/EntryPage';
function App() {
  const [dish, setDish] = useState([]);
  const [show, setShow] = useState(true);
  const [warn, setWarn] = useState(false);

  

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
      
     <Navbar size={dish.length} setShow={setShow} setDish={setDish}/>
       


      <Routes>
      <Route path="/" element={<LoginPage/>} />
        <Route path="/adminHome" element={<AdminHome />} />
       
        <Route path="/adminLogin" element={<AdminLogin />} />
       
        <Route path="/UploadScreen" element={<UploadScreen />} />
        <Route path="/EditDishScreen" element={<EditDishScreen />} />
        <Route path="/DisplayDishes" element={<DisplayDishes />} />
        <Route path="/ViewDishes" element={<ViewDish />} />
        <Route path="/EntryPage" element={<EntryPage dish={dish} warn={warn} setDish={setDish} handleChange={handleChange} show={show} handleClick={handleClick} />} />

      </Routes>
    </div>
  );
}

export default App;
