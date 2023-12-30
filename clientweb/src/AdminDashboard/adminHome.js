import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DisplayDishes from './DisplayDishes';
const AdminHome = () => {
  const location = useLocation();
  

  

  
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {/* <p>Login: {location.state.id}</p> */}
      <DisplayDishes/>
    </div>
  );
};

export default AdminHome;
