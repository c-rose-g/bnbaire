const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Booking, User, Spot, SpotImage } = require('../../db/models');

// GET ALL OF THE CURRENT USER'S BOOKINGS
router.get('/current', requireAuth, async (req, res) => {
  console.log('tst')
	const currBookings = await Booking.findAll({
		include: {
			model: Spot,

		},
		where: {
			userId: req.user.id,
		},
	});
	let bookings = [];

	for (let booking of currBookings) {
    console.log('bookings',bookings)
		const image = await SpotImage.findAll({

      attributes:{
        include:['url']
      }
		});
		console.log('image' ,image);
		// booking.previewImage;
	}
	return res.status(200).json(currBookings);
});

// EDIT A BOOKING
router.put('/:bookingId', requireAuth, async (req, res) => {});

// DELETE A BOOKING, must belong to current user or spot must belong to current user
router.delete('/:bookingId', requireAuth, async (req, res) => {});

module.exports = router;
