const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews');
const { restoreUser } = require('../../utils/auth.js');
// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

// router.use('/bookings', bookingsRouter);
router.use('/reviews', reviewsRouter);
// router.use('/spotImages', spotImagesRouter);
// router.use('/reviewImages', reviewImagesRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});
// require token cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// require user
// const { User } = require('../../db/models');

// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });

// GET /api/set-token-cookie
//TEST ROUTE FOR TOKEN COOKIE
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Cece1'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// TEST ROUTE FOR RESTORE USER
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// GET /api/require-auth TEST ROUTE FOR REQUIRE AUTH
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

module.exports = router;
