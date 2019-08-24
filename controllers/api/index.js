// modules
const router = require('express').Router();
const userRoutes = require('./user');

// declare our routes
// path - /user
router.use('/user', userRoutes);

module.exports = router;