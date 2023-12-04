const mongoose = require("mongoose");
const imageSchema= new mongoose.Schema({
  url:  String,
  filename:String

})
const signupSchema = new mongoose.Schema({
    email: {
        type: String,
      
    },
    password: {
        type: String,
       
    },
});



const dishSchema = new mongoose.Schema({
  name: {
    type: String,
   
  },
  description: {
    type: String,
    
  },
  price: {
    type: Number,
   
  },
  category: {
    type: String,
  
  },
  imageUrl: {
    type: String,
  },
  ingredients: {
    type: [String], 
  },
  isVegetarian:{
    type:Boolean
  }
});

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
});

const Review = mongoose.model('Review', reviewSchema);
const Dish = mongoose.model('Dish', dishSchema);
const Signup = mongoose.model('Signup', signupSchema);

module.exports = {
  Review,
  Dish,
  Signup,
};
