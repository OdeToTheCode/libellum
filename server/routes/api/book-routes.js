const router = require('express').Router();

const { searchBooks } = require('../../controllers/bookSearch-controller'); 

const {getACart, addABook, RMBook} = require("../../controllers/api/shoppingcart")



router.route('/').get(searchBooks);

router.route("/:id").get(getACart)

router.route("/:id").get(getACart).post(addABook);

router.route("/:id/:ISBN").get(getACart).delete(RMBook)

module.exports = router;