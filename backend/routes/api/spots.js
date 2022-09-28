const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

// add express validator here

// EDIT A SPOT (yes auth)
router.put('/:spotId', async (req, res) => {
	const { spotId } = req.params;
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;

	const spot = await Spot.findByPk(spotId);
	if (spot) {
		spot.update({
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
		});

		return res.status(200).json(spot);
	} else {
		res.status(404);
		return res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}
});

// GET ALL SPOTS OWNED BY THE CURRENT USER (yes auth)
router.get('/current', requireAuth, async (req, res) => {
	const Spots = await Spot.findAll({
		where: {
			ownerId: req.user.id,
		},
	});
	// const spots = {}
	// spots.Spots = Spots
	res.status(200).json({ Spots });
});

// GET ALL REVIEW BY A SPOT'S ID
router.get('/:spotId/reviews', async (req, res) => {
	const { spotId } = req.params;
	if (spotId) {
		const Reviews = await Review.findAll();
		res.status(200).json({ Reviews });
	} else {
		res.status(404).json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}
});

//GET DETAILS OF A SPOT FROM AN ID (no auth)
router.get('/:spotId', async (req, res) => {
	const { spotId } = req.params;
	if (spotId) {
		const spot = await Spot.findByPk(spotId);
		res.status(200).json(spot);
	} else {
		res.status(404).json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}
});

// DELETE A SPOT (yes auth, yes authorization)
router.delete('/:spotId', requireAuth, async (req, res) => {
	const { spotId } = req.params;
	if (spotId) {
		const spot = await Spot.findByPk(spotId);
		spot.destroy();
		res.status(200).json({
			message: 'Successfully deleted',
			statusCode: 200,
		});
	}
});
// CREATE A REVIEW FOR A SPOT BASED ON THE SPOT'S ID
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
	const { spotId } = req.params;
	const { review, stars } = req.body;

	if (spotId) {
		const reviews = await Review.findOne({
			where: {
				spotId: spotId,
			},
		});
		const newReview = await reviews.create({ review: review, stars: stars });
		res.status(200).json(newReview);
	} else {
		res.status(404).json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}
});

// ADD AN IMAGE TO A SPOT BASED ON THE SPOT'S ID (yes auth(logged in), yes authorization(user role/set of user permissions))
router.post('/:spotId/Images', requireAuth, async (req, res) => {
	const { url, preview } = req.body;
	const { spotId } = req.params;
	if (spotId) {
		const spot = await Spot.findByPk(spotId);
		const spotImage = await SpotImage.create({
			id: spotId,
			url,
			preview,
		});
		res.status(200).json(spotImage);
	} else {
		res.status(404);
		res.json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}
});

// CREATE A SPOT (yes auth)
router.post('/', requireAuth, async (req, res) => {
	const { address, city, state, country, lat, lng, name, description, price } =
		req.body;

	const newSpot = await Spot.create({
		ownerId: req.user.id,
		address,
		city,
		state,
		country,
		lat,
		lng,
		name,
		description,
		price,
	});

	res.status(201).json(newSpot);
});

// GET ALL SPOTS (no auth)
router.get('/', async (req, res) => {
	const Spots = await Spot.findAll();

	res.status(200).json({ Spots });
});

module.exports = router;
