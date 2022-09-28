const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
	check('firstName')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a first name.'),
	check('lastName')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a last name.'),
	check('email')
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage('Please provide a valid email.'),
	check('username')
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage('Please provide a username with at least 4 characters.'),
	check('username').not().isEmail().withMessage('Username cannot be an email.'),
	check('password')
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage('Password must be 6 characters or more.'),
	handleValidationErrors,
];
// Sign up
router.post('/', validateSignup, async (req, res, next) => {
	const { firstName, lastName, email, password, username } = req.body;

	const emailExists = await User.findOne({
		where: {
			email: email,
		},
	});
	if (emailExists) {
		res.status(403);
		return res.json({
			message: 'User already exists',
			statusCode: 403,
			errors: {
				email: 'User with that email already exists',
			},
		});
	}
	const usernameExists = await User.findOne({
		where: {
			username: username,
		},
	});

	if (usernameExists) {
		res.status(403);
		return res.json({
			message: 'User already exists',
			statusCode: 403,
			errors: {
				username: 'User with that username already exists',
			},
		});
	}
	let user = await User.signup({
		firstName,
		lastName,
		email,
		username,
		password,
	});

	let newToken = await setTokenCookie(res, user);

	user = user.toSafeObject();
	user.token = newToken;
	return res.json(user);
});

module.exports = router;
