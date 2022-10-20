const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const {
	Review,
	User,
	ReviewImage,
	Spot,
	SpotImage,
} = require('../../db/models');
const sequelize = require('sequelize');

// GET ALL reviews OF THE CURRENT USER
// NOTE do i need to change stars to single digits?
// NOTE should i change LAT/LNG/PRICE to numbers
router.get('/current', requireAuth, async (req, res) => {
	const getReviews = await Review.findAll({
		where: {
			userId: req.user.id,
		},
		include: [
			{ model: User, attributes: ['id', 'firstName', 'lastName'] },
			{ model: Spot, attributes: { exclude: ['createdAt', 'updatedAt','description'] } },
			{ model: ReviewImage },
		],
	});

	let reviews = [];
	for (let review of getReviews) {
		let reviewJSON = review.toJSON();

		const spotImage = await SpotImage.findByPk(review.id, {
			where: {
				preview: true,
				attributes: ['url'],
			},
		});
		// delete reviewJSON.description
		reviewJSON.Spot.previewImage = spotImage.url;
		reviews.push(reviewJSON);
	}
	res.status(200).json({ Reviews: reviews });
});

//REVIEW EDIT A review
router.put('/:reviewId', requireAuth, async (req, res) => {
	const { reviewId } = req.params;
	const { review, stars } = req.body;
	const reviewByPk = await Review.findByPk(reviewId);

	if (!reviewByPk) {
		return res.status(404).json({
			message: "Review couldn't be found",
			statusCode: 404,
		});
	}
	const spotReview = await Spot.findOne({
		include: { model: Review, attributes: { include: ['spotId'] } },
		attributes: {
			exclude: [
				'address',
				'city',
				'state',
				'country',
				'lat',
				'lng',
				'name',
				'description',
				'price',
				'createdAt',
				'updatedAt',
			],
		},
	});

	try {
		if (req.user.id === reviewByPk.userId) {
			const reviewUpdate = await reviewByPk.update({
				id: reviewByPk.id,
				userId: req.user.id,
				spotId: spotReview.id,
				review,
				stars,
			});
			res.status(200).json(reviewUpdate);
		}
	} catch {
		return res.status(400).json({
			message: 'Validation error',
			statusCode: 400,
			errors: {
				review: 'Review text is required',
				stars: 'Stars must be an integer from 1 to 5',
			},
		});
	}
});

// FIXME DELETE A REVIEW - current user must own review
router.delete('/:reviewId', requireAuth, async (req, res) => {
	const { reviewId } = req.params;
	const reviewByPk = await Review.findByPk(reviewId);

	if (!reviewByPk) {
		return res.status(404).json({
			message: "Review couldn't be found",
			statusCode: 404,
		});
	}

	reviewByPk.destroy();
	return res.status(200).json({
		message: 'Successfully deleted',
		statusCode: 200,
	});
});

// ADD AN IMAGE TO A REVIEW BASED ON THE REVIEW'S ID
router.post('/:reviewsId/images', requireAuth, async (req, res) => {
	const { reviewsId } = req.params;
	const { url } = req.body;
	const review = await Review.findByPk(reviewsId);
	if (!review) {
		return res.status(404).json({
			message: "Review couldn't be found",
			statusCode: 404,
		});
	}

	const count = await ReviewImage.count({
		where: {
			reviewId: reviewsId,
		},
	});

	if (count === 10) {
		return res.status(403).json({
			message: 'Maximum number of images for this resource was reached',
			statusCode: 403,
		});
	}
	const reviewOwner = await User.findOne({
		include: { model: Review },
		where: {
			id: req.user.id,
		},
	});

	// if (reviewOwner) {
		const reviewImage = await ReviewImage.create({
			reviewId: reviewsId,
			url,
		});

		res.status(200).json({ id: reviewsId, url: reviewImage.url });
	// }
});

module.exports = router;
