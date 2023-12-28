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
<<<<<<< HEAD
      console.log('error')
=======
      res.redirect('/'); 
>>>>>>> 7cd6b7aa2966cb11a8dd239bd9294cc3fd397f7a
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;