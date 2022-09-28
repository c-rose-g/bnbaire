const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Review, User, ReviewImage } = require('../../db/models');



// GET ALL REVIEWS OF THE CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
	const Reviews = await Review.findAll({
		include: [{ model: User }, { model: Spot }], //,{model:ReviewImage, as:'ReviewImages'}
	});
	res.status(200).json({ Reviews });
});


module.exports = router;
