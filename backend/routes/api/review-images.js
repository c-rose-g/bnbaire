const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const {ReviewImage, Review} = require('../../db/models');

// DELETE A REVIEW IMAGE review must belong to current user
router.delete('/:imageId', requireAuth, async(req,res) =>{
  
})
module.exports = router;
