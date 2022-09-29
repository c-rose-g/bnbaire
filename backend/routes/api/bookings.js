const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const {Booking, User, Spot, SpotImage} = require('../../db/models');


// GET ALL OF THE CURRENT USER'S BOOKINGS
router.get('/current', requireAuth, async(req,res) =>{
  const bookings = await Booking.findAll({
    where:{
      userId: req.user.id
    },
    include:[{
      model: User,
    },
    {
      model: Spot
    }
  ]
  })
  for(let booking of bookings){
    const image = await SpotImage.findAll({
      where:{
        preview:true
      },
      // spotId: 
    })
  }
})

// EDIT A BOOKING
router.put('/:bookingId', requireAuth, async(req,res) =>{

})

// DELETE A BOOKING, must belong to current user or spot must belong to current user
router.delete('/:bookingId', requireAuth, async(req,res) =>{

})

module.exports = router;
