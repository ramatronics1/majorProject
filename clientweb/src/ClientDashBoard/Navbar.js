import React from 'react';


const Navbar = ({size, setShow}) => {
  return (
    <nav>
        <div>
            <span  onClick={()=>setShow(true)}>
                My Shopping
            </span>
            <div onClick={() => setShow(prevShow => !prevShow)}>
                <span>
                    <i className="fas fa-cart-plus">count of orders = </i>
                </span>
                <span>{size}</span>
            </div>
        </div>
    </nav>
  )
}

export default Navbar