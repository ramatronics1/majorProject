import React, { useEffect, useState } from 'react';
import { useNavigate, useParams ,useLocation} from 'react-router-dom';

const Home = () => {
  const location=useLocation();
  
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Login: {location.state.id}</p>
    </div>
  );
};

export default Home;
