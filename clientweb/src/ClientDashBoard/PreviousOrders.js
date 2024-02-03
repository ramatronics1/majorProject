import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PreviousOrders = ({ id }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPrevOrders = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/prevOrders/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching previous orders:', error);
      }
    };

    fetchPrevOrders();
  }, [id]);

  return (
    <div>
      <h2>Previous Orders</h2>
      <ul>
        {data.map((order) => (
          <li key={order._id}>
            <div>
              <strong>Order ID:</strong> {order._id}
            </div>
            <div>
              <strong>Total Amount:</strong> {order.totalAmount}
            </div>
            <div>
              <strong>Status:</strong> {order.status}
            </div>
            <div>
              <strong>Ordered Items:</strong>
              <ul>
                {order.eachOrder.map((item) => (
                  <li key={item._id}>
                    <div>
                      <strong>Dish Name:</strong> {item.dishId.name}
                    </div>
                    <div>
                      <strong>Quantity:</strong> {item.quantity}
                    </div>
                    <div>
                      <strong>Special Instructions:</strong> {item.specialInstructions}
                    </div>
                    {/* Add more details as needed */}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousOrders;
