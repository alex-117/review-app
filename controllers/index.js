// modules
const router = require('express').Router();
const apiRoutes = require('./api');

// declare our routes
router.use('/api', apiRoutes);

module.exports = router;