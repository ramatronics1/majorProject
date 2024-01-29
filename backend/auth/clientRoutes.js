const express = require("express");
const router = express.Router();
const { Auth } = require('../models/clientSchema');
const { Dish } = require('../models/adminSchema');
const {Order}=require('../models/clientSchema')

router.get('/', (req, res) => {
  // Handle GET request
});

router.post('/clientLogin', async (req, res) => {
  console.log(req.body);
  const { usn, dob } = req.body;

  try {
    const found = await Auth.findOne({ usn: usn });
    console.log(found);

    if (found.dob === dob) {
      res.json('exist');
    } else {
      console.log('error');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/fetchDishes', async (req, res) => {
  try {
    const found = await Dish.find();

    if (found) {
      res.json(found);
    } else {
      res.json('No dishes or error fetching');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/createOrder', async (req, res) => {
  const { userId, dishes, totalAmount } = req.body;

  try {
    
    const newOrder = new Order({
     
      dishes: dishes.map(dish => ({
        dishId: mongoose.Types.ObjectId(dish.dishId),
        quantity: dish.quantity,
        specialInstructions: dish.specialInstructions || '',
      })),
      totalAmount: totalAmount,
      status: 'Pending', 
    });

    const savedOrder = await newOrder.save();

   
    res.json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
