import React from 'react'
import AddtoCart from './addtoCart'
import { useLocation } from 'react-router-dom';
import Home from './Home'
const EntryPage = ({show,dish,setDish,handleClick,handleChange,warn}) => {
  
  
 
  return (
    <div>
     
        {
    warn&&<div> item already present in cart</div>
}
         {
  show ? (
    <Home handleClick={handleClick}  />
  ) : (
    <AddtoCart dish={dish} setDish={setDish} handleChange={handleChange} />
  )
}

      
    </div>
  )
}

export default EntryPage
