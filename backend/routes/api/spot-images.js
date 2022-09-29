const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const {SpotImage, Spot} = require('../../db/models');


module.exports = router
