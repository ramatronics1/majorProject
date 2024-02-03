import React, { useEffect } from 'react'
import StudentLogin from './StudentLogin'
import Navbar from './Navbar'

const LoginPage = ({setId,setIsLoggedIn}) => {
   
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
    
   
  };


  useEffect(() => {
    checkLocalStorage();
  });
 useEffect(() => {
    handleLogout();
  });
    
  return (
    <div>
      

      
         <StudentLogin setId={setId}/>
      
    </div>
  )
}

export default LoginPage
