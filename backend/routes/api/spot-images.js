const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { SpotImage, Spot } = require('../../db/models');


// FIXME DELETE A SPOT IMAGE - current user must own spot
router.delete('/:imageId', requireAuth, async (req, res) => {
	const { imageId } = req.params;
	const spotImageByPk = await SpotImage.findByPk(imageId)

	// console.log('spot image:', spotImageByPk);
	if (!spotImageByPk) {
		return res.status(404).json({
			message: "Spot Image couldn't be found",
			statusCode: 404,
		});
	}

  // const spot = await Spot.findAll({
  //   where:{
  //     ownerId: req.user.id
  //   }
  // })
  // if(req.user.id === spotImage.){

    spotImageByPk.destroy();
    res.status(200).json({
      message: 'Successfully deleted',
      statusCode: 200,
    });
  // }
});

module.exports = router;
