const router = require('express').Router();
const userRoutes = require('./user-routes');
const bookRoutes = require('./book-routes');
const shoppingCartRoutes = require("./shoppingcart-routes")

router.use('/search', bookRoutes);
router.use("/cart", shoppingCartRoutes )
router.use("/user", userRoutes);

module.exports = router;

