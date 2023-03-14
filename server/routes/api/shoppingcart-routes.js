const router = require('express').Router();

// Import any controllers needed here
const { addABook, RMBook, getACart } = require('../../controllers/shoppingcart');

// Declare the routes that point to the controllers above
router.route('/:id').post(addABook).get(getACart);
router.route('/:userid/:bookid').delete(RMBook)

module.exports = router;