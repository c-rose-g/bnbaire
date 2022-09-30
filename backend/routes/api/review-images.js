const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { ReviewImage } = require('../../db/models');

// FIXME DELETE A REVIEW IMAGE review must belong to current user
router.delete('/:imageId', requireAuth, async (req, res) => {
	const { imageId } = req.params;
	const reviewImageByPk = await ReviewImage.findByPk(imageId);
	if (!reviewImageByPk) {
		return res.status(404).json({
			message: "Review Image couldn't be found",
			statusCode: 404,
		});
	}
	reviewImageByPk.destroy();
	return res.status(200).json({
		message: 'Successfully deleted',
		statusCode: 200,
	});
});
module.exports = router;
