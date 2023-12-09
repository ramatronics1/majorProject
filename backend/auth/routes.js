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

route.delete("/deleteDishes/:id",async(req,res)=>{
  const {id} = req.params; 

  await Dish.findByIdAndDelete(id);
  res.redirect('/displayDishes')

})

route.put('/updateDishes/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, ingredients, isVegetarian } = req.body;

  try {
    const dish = await Dish.findById(id);
    console.log(dish)

    if (!dish) {

      return res.redirect('/campgrounds');
    }

    // const imageFiles = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    // dish.Image.push(...imageFiles);
    dish.name = name;
    dish.ingredients = ingredients;
    dish.description = description;
    dish.price = price;
    dish.isVegetarian = isVegetarian;
    dish.category = category;

    await dish.save();

    // if(req.body.deleteImages){
    // for(let filename of req.body.deleteImages){
    // await cloudinary.uploader.destroy(filename)
    // }
    // await campground.updateOne({$pull:{Image:{filename:{$in:req.body.deleteImages}}}})
  } catch (err) {
    console.error(err);
    
    return res.redirect(`/displayDishes`); // Redirect to an appropriate error page or back to the form, as desired
  }

 
  res.redirect(`/displayDishes`);
});


module.exports = route;
