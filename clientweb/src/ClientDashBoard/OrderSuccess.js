import React from 'react';
import { useLocation } from 'react-router-dom'; 

const OrderSuccess = () => {
  const location = useLocation(); 
  const orderId = location.state ? location.state.orderId : null; 

  return (
    <div>
      {orderId ? (
        <div>
          Your order with Order ID {orderId} has been successfully placed. Please anticipate an email when your order is prepared. You can collect and pay for your order in the store upon receiving the email.
        </div>
      ) : (
        <div>
          Your order may not have been placed properly. You will receive a mail if it is placed, otherwise, please try ordering again.
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;
