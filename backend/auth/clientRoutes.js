const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { Auth } = require('../models/clientSchema');
const { Dish } = require('../models/adminSchema');
const { Order } = require('../models/clientSchema');
const { eachOrder } = require('../models/clientSchema');



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
  const { price } = req.body;

  const data = req.body.items.map((f) => ({
    dishId: new mongoose.Types.ObjectId(f.dishId),
    quantity: f.quantity,
    specialInstructions: f.specialInstructions,
  }));

  try {
    const newOrder = new Order({
      totalAmount: price,
    });
    newOrder.eachOrder = data;
    console.log(newOrder);

    const savedOrder = await newOrder.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/displayOrders', async (req, res) => {
  try {
    const orders = await Order.find().populate('eachOrder.dishId');
    console.log(orders[0].eachOrder[0].dishId.imageUrl);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
