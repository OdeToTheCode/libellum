const router = require('express').Router();

// Import any controllers needed here
const { authUser, createUser, updateUser, verifyUser, logoutUser, getUserId } = require('../../controllers/user-controller');

// Declare the routes that point to the controllers above
router.route('/').post(createUser);
router.route('/auth').post(authUser);
router.route('/verify').post(verifyUser);
router.route('/:id').put(updateUser);
router.route("/logout").post(logoutUser);
router.route("/getuserid/:email").get(getUserId);

module.exports = router;
