import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Navbar = ({ size, setShow, setDish,id,setIsLoggedIn,isLoggedIn }) => {
  
  const history = useNavigate();

  const checkLocalStorage = () => {
    const isLoggedInString = localStorage.getItem('isLoggedIn');
    let isLoggedIn = false;
    if (isLoggedInString === 'true') {
      isLoggedIn = !isLoggedIn;
    }
    setIsLoggedIn(isLoggedIn);
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', false.toString());
    setIsLoggedIn(false);
    setDish([]);
    history('/');
  };
const handlePrevOrders=()=>{
history('/PreviousOrders')
}
  useEffect(() => {
    checkLocalStorage();
  });

  return (
    <nav>
      <div>
        <span onClick={() => setShow(true)}>My Shopping</span>
        <div onClick={() => setShow((prevShow) => !prevShow)}>
          <span>
            <i className="fas fa-cart-plus">count of orders = </i>
          </span>
          <span>{size}</span>
        </div>
     
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        {isLoggedIn && <button onClick={()=>handlePrevOrders()}>Previous Orders</button>}
      </div>
    </nav>
  );
};

export default Navbar;
