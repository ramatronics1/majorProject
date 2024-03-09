import React, { useEffect } from 'react'
import StudentLogin from './StudentLogin'
import { Link } from 'react-router-dom';

const LoginPage = ({setId,setIsLoggedIn,setDish}) => {
   
  const checkLocalStorage = () => {
    const isLoggedInString = localStorage.getItem('isLoggedIn');
    let isLoggedIn = false;
   
    if (isLoggedInString === 'true') {
      isLoggedIn = true;
    }
    console.log(isLoggedIn)
    setIsLoggedIn(isLoggedIn);
  };
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', false.toString());
    setIsLoggedIn(false);
    setDish([])
   
  };


  useEffect(() => {
    checkLocalStorage();
  
  });
 useEffect(() => {
    handleLogout();
    
  },[]);
    
  return (
    <div>
      
      <h1>Are u the owner if yes press</h1><span><button><Link to={{ pathname:'/HotelDisplay' }}>
              Here
            </Link></button></span>
      
         <StudentLogin setId={setId}/>
      
    </div>
  )
}

export default LoginPage
