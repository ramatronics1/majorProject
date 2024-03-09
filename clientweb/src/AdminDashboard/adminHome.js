import React, { useEffect, useState } from 'react';
import { useLocation, useParams ,Link} from 'react-router-dom';
import axios from 'axios';

const AdminHome = () => {
  
  const {hotelId}=useParams();

  

  
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button>
            <Link to={{ pathname: `/EntryPage/${hotelId}` }}>
              Display dishes?
            </Link>
            
          </button>
          <button>
          <Link to={{ pathname: `/hotel/${hotelId}/UploadScreen` }}>
              Upload dishes?
            </Link>
            </button>
      
    </div>
  );
};

export default AdminHome;
