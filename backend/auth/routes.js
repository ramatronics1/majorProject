const express = require('express');
const route = express.Router();
const {cloudinary}=require('../cloudinary/index')
const bcrypt = require('bcrypt');

const { Review, Dish, Signup,Hotel } = require('../models/adminSchema');

const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

route.post('/addNewDish', upload.array('image'),async (req, res) => {

 
 
  try {
    const { name, description, price, category, ingredients ,imageUrl,isVegetarian} = req.body;
    
   const imageFiles = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    const newDish = new Dish({
      name: name,
      description: description,
      price: price,
      category: category,
      imageUrl: imageFiles,
      quantity:1,
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
route.post('/hotelRegister', upload.array('image'), async (req, res) => {
  try {
    const { name, description, phone, email, longitude, latitude } = req.body;
    const imageFiles = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    const newHotel = new Hotel({
      name: name,
      description: description,
      phone: phone,
      email: email,
      geometry: {
        coordinates: [latitude, longitude]
      },
      imageUrl: imageFiles
    });

    await newHotel.save();

    res.status(201).json({ message: 'Hotel registered successfully', hotel: newHotel });
  } catch (error) {
    console.error('Error registering hotel:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

route.get('/hotelsDisplay', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    // Handle the error appropriately, such as logging it or sending an error response
    console.error("Error fetching hotels:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
    const { email, password, id } = req.body;

    try {
        const hotel = await Hotel.findById(id); 
        console.log(hotel)
        
        if (hotel) {
            const user = await Signup.findOne({ email });
            console.log(user)
            if (user) {
                const userId = user._id;
                const isUserAssociatedWithHotel = hotel.user.includes(userId);
                console.log(isUserAssociatedWithHotel)

                if (isUserAssociatedWithHotel) {
                  
                    console.log('User is associated with the hotel');
                    res.status(200).json({ success: true, message: 'Login successful' });
                } else {
                 
                    res.status(401).json({ success: false, message: 'User is not associated with the hotel' });
                }
            } else {
                
                res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
        } else {
            
            res.status(404).json({ success: false, message: 'Hotel not found' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in: ' + error });
    }
});


route.post('/adminSignup', async (req, res) => {
  try {
    const { email, password, id } = req.body;

    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new Signup({
      email: email,
      password: hashedPassword,
    });

 
    const savedUser = await user.save();


    hotel.user.push(savedUser._id);
    await hotel.save();

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

route.put('/updateDishes/:id', upload.array('image'), async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, ingredients, isVegetarian, } = req.body;
console.log(req.body)
  try {
    const dish = await Dish.findById(id);
    const imageFiles = req.files.map((f) => ({ url: f.path, filename: f.filename }));
    dish.imageUrl.push(...imageFiles);
    dish.name = name;
    dish.ingredients = ingredients;
    dish.description = description;
    dish.price = price;
    dish.isVegetarian = isVegetarian;
    dish.category = category;

 
    await dish.save();

   

    if (req.body.deleteImages) {
      
      const deleteImages = Array.isArray(req.body.deleteImages) ? req.body.deleteImages : [req.body.deleteImages];
  
      
          
          const deletePromises = deleteImages.map(filename => cloudinary.uploader.destroy(filename));
          await Promise.all(deletePromises);
  
          
          await dish.updateOne({ $pull: { imageUrl: { filename: { $in: deleteImages } } } });
  
     
  
  }
  } catch (err) {
    console.error(err);
    
    return res.redirect(`/displayDishes`); 
  }


});

route.post('/fetchDishes/:id',async(req,res)=>{
  const id=req.params;
  const dish=dish.findById(id);
  console.log(dish)
})
route.post('/hotel/:id',async(req,res)=>{
  const id=req.params.id;
  
  const hotel=await Hotel.findById(id);
  res.json(hotel)
})
module.exports = route;
