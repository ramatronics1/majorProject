const express = require("express");
const router = express.Router();
const { Auth, Order } = require('../models/clientSchema');

  
router.get('/',(req,res)=>{

})
router.post('/clientLogin', async (req, res) => {
  
   console.log(req.body)
  const { usn, dob } = req.body;

  try {
    const found = await Auth.findOne({ usn: usn });
  
    console.log(found)
    if (found.dob === dob) {
      res.json('exist')

    } else {
      console.log('error')
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;