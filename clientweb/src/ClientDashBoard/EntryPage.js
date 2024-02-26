import React from 'react'
import AddtoCart from './addtoCart'
import { useLocation } from 'react-router-dom';
import Home from './Home'
const EntryPage = ({show,dish,setDish,handleClick,handleChange,warn}) => {
  const location = useLocation();
  const { id, name } = location.state
  console.log(name,id)
  return (
    <div>
     
        {
    warn&&<div style={{'height':'50px', 'background': 'var(--light-brown)'}}> <h3 style={{'color': 'red'}}>Item already present in cart</h3></div>
}
         {
  show ? (
    <Home handleClick={handleClick} name={name} />
  ) : (
    <AddtoCart dish={dish} setDish={setDish} handleChange={handleChange} />
  )
}

      
    </div>
  )
}

export default EntryPage
