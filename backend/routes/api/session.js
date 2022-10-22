const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
	check('credential')
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage('Email or username is required'),
	check('password')
		.exists({ checkFalsy: true })
		.withMessage('Password is required'),
	handleValidationErrors,
];

// POST Log in
router.post('/', validateLogin,  async (req, res, next) => {
	const { credential, password } = req.body;

	let user = await User.login({ credential, password });

	if (!user) {
		const err = new Error('Login failed');
		err.status = 401;
		err.title = 'Login failed';
		err.errors = ['The provided credentials were invalid.'];
		return next(err);
		// res.status(401);
		// return res.json({
		// 	message: 'Invalid credentials',
		// 	statusCode: 401,
		// });
	}

	const token = await setTokenCookie(res, user);
	user = user.toJSON();
	user.token = token;
	return res.json(user);
});

// DELETE Log out
router.delete('/', (_req, res) => {
	res.clearCookie('token');
	return res.json({ message: 'success' });
});

// Restore session user
router.get('/', restoreUser, (req, res) => {
	const { user } = req;
	if (user) {
		return res.json(user.toSafeObject());
	} else return res.json(null);
});

module.exports = router;
