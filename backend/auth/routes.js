const express = require('express');
const route = express.Router();

const bcrypt = require('bcrypt');

const { Review, Dish, Signup } = require('../models/adminSchema');

const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

route.post('/addNewDish', async (req, res) => {
  console.log(req.body)
 
  try {
    const { name, description, price, category, ingredients ,imageUrl,isVegetarian} = req.body;

    const newDish = new Dish({
      name: name,
      description: description,
      price: price,
      category: category,
      imageUrl: imageUrl,
      ingredients: ingredients, 
      isVegetarian:isVegetarian
    });

    console.log(newDish);

    await newDish.save();

    res.status(201).json({ message: 'Dish added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

 route.get('/displayDishes', async (req, res) => {
    try {
      const dishes = await Dish.find();
      console.log(dishes)
      res.json(dishes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
route.post('/adminLogin', async (req, res) => {
  

    const { email, password } = req.body;

    const saltRounds = 10;
    try {
        const user = await Signup.findOne({ email });

        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword) {
                
                console.log("logged in")

                res.status(200).json({ success: true, message: 'Login successful' });
            } else {
                res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error logging in' + error });
    }
});

route.post('/adminSignup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new Signup({
            email: email,
            password: hashedPassword,
        });

        const savedUser = await user.save();
        

        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error signing up' + error });
    }
});

module.exports = route;
