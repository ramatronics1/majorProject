import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import './App.css';
import StudentLogin from './ClientDashBoard/StudentLogin';
import Home from './ClientDashBoard/Home';
import AdminHome from './AdminDashboard/adminHome';
import AdminLogin from './AdminDashboard/LoginPage';
import UploadScreen from './AdminDashboard/UploadScreen'
import EditDishScreen from './AdminDashboard/EditDishScreen'
import DisplayDishes from './AdminDashboard/DisplayDishes';
import ViewDish from './ClientDashBoard/ViewDish';
import AddtoCart from './ClientDashBoard/addtoCart';

function App() {
  return (
  
      <div className="App">
        <Routes>
        <Route path="/adminHome" element={<AdminHome/>} />
          <Route path="/" element={<StudentLogin/>} />
          <Route path="/adminLogin" element={<AdminLogin/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/UploadScreen" element={<UploadScreen />} />
          <Route path="/EditDishScreen" element={<EditDishScreen />} />
          <Route path="/DisplayDishes" element={<DisplayDishes/>} />
          <Route path="/ViewDishes" element={<ViewDish/>} />
          <Route path="/addtoCart" element={<AddtoCart/>} />

        
        </Routes>
      </div>
    
  );
}

export default App;