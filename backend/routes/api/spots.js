const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const sequelize = require('sequelize');
const {
	Spot,
	Review,
	SpotImage,
	User,
	Booking,
	ReviewImage,
} = require('../../db/models');

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

// ADD AN IMAGE TO A SPOT BASED ON THE SPOT'S ID (yes auth(logged in), yes authorization(user role/set of user permissions))
router.post('/:spotId/images', requireAuth, async (req, res) => {
	const { url, preview } = req.body;
	const { spotId } = req.params;
	if (spotId) {
		const spot = await Spot.findByPk(spotId);
		if (!spot) {
			res.status(404);
			return res.json({
				message: "Spot couldn't be found",
				statusCode: 404,
			});
		} else {
			let spotImage = await SpotImage.create({
				spotId: spotId,
				url,
				preview,
			});

			let image = spotImage.toJSON();
			delete image.spotId;
			delete image.preview;
			delete image.createdAt;
			delete image.updatedAt;

			res.status(200).json(image);
		}
	}
});

// CREATE A REVIEW FOR A SPOT BASED ON THE SPOT'S ID
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
	const { spotId } = req.params;
	const { review, stars } = req.body;
	const spot = await Spot.findByPk(req.params.spotId);

	if (!spot) {
		return res.status(404).json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}
	const oneReview = await Review.findOne({
		where: {
			spotId: spot.id,
			userId: req.user.id,
		},
	});
	if (oneReview) {
		return res.status(403).json({
			message: 'User already has a review for this spot',
			statusCode: 403,
		});
	}
	try {
		const newReview = await Review.create({
			userId: req.user.id,
			spotId: spot.id,
			review,
			stars,
		});
		return res.json(newReview);
	} catch {
		res.json({
			message: 'validatorError',
			statusCode: 400,
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

// GET ALL BOOKINGS FOR A SPOT BASED ON THE SPOT'S ID

router.get('/:spotId/bookings', requireAuth, async (req, res) => {});

// GET ALL REVIEWS BY A SPOT'S ID
router.get('/:spotId/reviews', async (req, res) => {
	// const { spotId } = req.params;
	const spot = await Spot.findByPk(req.params.spotId);
	if (!spot) {
		return res.status(404).json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	}
	const review = await Review.findAll( {
		include: [
			{
				model: User,
				attributes: ['id', 'firstName', 'lastName'],
			},
			{
				model: ReviewImage,
				attributes: ['id', 'url'],
			},
		],
		where:{
			spotId:req.params.spotId,
		}
	}
	);

	res.status(200).json(review);
});

// GET ALL SPOTS OWNED BY THE CURRENT USER (yes auth)
router.get('/current', requireAuth, async (req, res) => {
	const allSpots = await Spot.findAll({
		include: { model: SpotImage, where: { preview: true } },
		where: {
			ownerId: req.user.id,
		},
	});
	let spots = [];
	for (let spot of allSpots) {
		spot = spot.toJSON();
		const rating = await Review.findAll({
			where: {
				userId: req.user.id,
			},
			attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']],
		});

		spot.avgRating = Number(rating[0].toJSON().avgRating);
		spot.previewImage = spot.SpotImages[0].url;
		delete spot.SpotImages;
		// console.log('rating', rating[0].toJSON().avgRating);
		spots.push(spot);
	}

	res.status(200).json({ spots });
});

//GET DETAILS OF A SPOT FROM AN ID (no auth)
router.get('/:spotId', async (req, res) => {
	const { spotId } = req.params;
	const existingSpot = await Spot.findByPk(spotId);
	// console.log('get all spots',getAllSpots)
	if (!existingSpot) {
		res.status(404).json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
	} else {
		const allSpots = await Spot.findAll({
			include: [
				{
					model: SpotImage,
					where: {
						preview: true,
					},
				},
				{
					model: User,
					as: 'Owners',
					attributes: ['id', 'firstName', 'lastName'],
				},
			],
			where: {
				id: spotId,
			},
		});
		let spot = [];
		for (let spotObj of allSpots) {
			spotObj = spotObj.toJSON();
			const rating = await Review.findAll({
				where: {
					spotId: spotObj.id,
				},
				attributes: [
					[sequelize.fn('COUNT', sequelize.col('review')), 'numReviews'],
					[sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating'],
				],
			});
			// console.log('rating',rating[0].toJSON().numReviews)
			let reviews = Number(rating[0].toJSON().numReviews);
			spotObj.numReviews = reviews;

			spotObj.avgStarRating = Number(rating[0].toJSON().avgStarRating);
			spot.push(spotObj);
			// console.log('spotObj',spotObj)
			// spotObj.numReviews = rating[0].toJSON().numReviews
		}
		res.status(200).json(...spot);
	}
});

// GET ALL SPOTS (no auth)
router.get('/', async (req, res) => {
	const allSpots = await Spot.findAll({
		include: {
			model: SpotImage,
			where: {
				preview: true,
			},
		},
	});

	// toJSON on each spot, key into review and spotimage, test on spot w/o reviews/stars
	let Spots = [];
	for (let spot of allSpots) {
		spot = spot.toJSON();
		const rating = await Review.findAll({
			where: {
				spotId: spot.id,
			},
			attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']],
		});

		spot.avgRating = Number(rating[0].toJSON().avgRating);
		spot.previewImage = spot.SpotImages[0].url;
		delete spot.SpotImages;
		Spots.push(spot);
	}

	res.status(200).json({ Spots });
});

module.exports = router;
