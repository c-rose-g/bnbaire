const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Review, User } = require('../../db/models');



// GET ALL REVIEWS OF THE CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
	const Reviews = await Review.findAll({
		include: [{ model: User }, { model: Spot }], //,{model:ReviewImage, as:'ReviewImages'}
	});
	res.status(200).json({ Reviews });
});

// EDIT A REVIEW
router.put('/:reviewId', requireAuth, async(req,res) =>{

})

// DELETE A REVIEW
router.delete('/:reviewId', requireAuth, async(req,res) >{

})
// ADD AN IMAGE TO A REVIEW BASED ON THE REVIEW'S ID
router.post('/:reviewsId/images', requireAuth, async(req,res)=>[

])

module.exports = router;
