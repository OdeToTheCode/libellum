const router = require('express').Router();

const { searchBooks } = require('../../controllers/bookSearch-controller'); 

router.route('/').get(searchBooks);



module.exports = router;