const router = require('express').Router();
const userRoutes = require('./user-routes');
const bookRoutes = require('./book-routes');

router.use('/search', bookRoutes);

module.exports = router;

