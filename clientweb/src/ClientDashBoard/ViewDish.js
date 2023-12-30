import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewDish = () => {
    const location = useLocation();
    const { state } = location;
    const id = state.id;

    const [dishes, setDishes] = useState(id);
    const [totalAmount, setTotalAmount] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
       
        setTotalAmount(dishes.price * quantity);
       
    }, [dishes.price, quantity]);

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity);
        setTotalAmount(dishes.price * newQuantity);
    };

    const handleQuantityKeyDown = (event) => {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            const step = event.key === "ArrowUp" ? 1 : -1;
            const newQuantity = quantity + step;
            setQuantity(newQuantity);
            setTotalAmount(dishes.price * newQuantity);
        }
    };

    return (
        <div>
            <h1>{dishes.name}</h1>
            <div>
                <h3>{dishes.name}</h3>
                <p>Description: {dishes.description}</p>
                <p>Price: ${dishes.price}</p>
                <p>Category: {dishes.category}</p>
                <p>Ingredients: {dishes.ingredients.join(', ')}</p>
                <p>Is Vegetarian: {dishes.isVegetarian ? 'Yes' : 'No'}</p>
                {dishes.imageUrl.map((image, imageIndex) => (
                    <img
                        key={imageIndex}
                        src={image.url}
                        alt={`Description of image ${imageIndex + 1}`}
                        style={{ width: '10%', height: 'auto', marginBottom: 8 }}
                    />
                ))}
                <label htmlFor='quantity'>Quantity:</label>
                <input
                    type='number'
                    id='quantity'
                    name='quantity'
                    value={quantity}
                    onChange={handleQuantityChange}
                    onKeyDown={handleQuantityKeyDown}
                />
                <p>Total Amount: ${totalAmount}</p>
                <input type='submit' />
            </div>
        </div>
    );
};

export default ViewDish;
