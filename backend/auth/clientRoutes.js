const express = require("express");
const router = express.Router();
const { Auth, Order } = require('../models/clientSchema');

  
router.post('/clientLogin', async (req, res) => {
  
    console.log(req.body)
  const { usn, dob } = req.body;

  try {
    const found = await Auth.findOne({ usn: usn });
  
    res.json(found)
    if (found && found.dob === dob) {
      console.log(found)
    } else {
      res.redirect('/home'); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;