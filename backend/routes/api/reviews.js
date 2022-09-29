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

// GET ALL REVIEWS OF THE CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
	const getReviews = await Review.findAll({
		where:{
			userId:req.user.id
		},
		include: [{ model: User }, { model: Spot }, { model: ReviewImage }],
	});

	res.status(200).json({getReviews});
});

// EDIT A REVIEW
router.put('/:reviewId', requireAuth, async (req, res) => {});

// DELETE A REVIEW
router.delete('/:reviewId', requireAuth, async (req, res) => {});
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

	if (reviewOwner) {
		const reviewImage = await ReviewImage.create({
			reviewId: reviewsId,
			url,
		});

		res.status(200).json({ id: reviewsId, url: url });
	}
});

module.exports = router;
