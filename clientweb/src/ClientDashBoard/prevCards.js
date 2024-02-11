import React from 'react'

const prevCards = ({order}) => {
  return (
    <div>
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
                  
                  </li>
                ))}
              </ul>
            </div>
          </li>
    </div>
  )
}

export default prevCards
