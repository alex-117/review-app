// modules
const router = require('express').Router();
const userRoutes = require('./user');
const todoRoutes = require('./todo');

// declare our routes
// path - /api/user
router.use('/user', userRoutes);
// path - /api/todo
router.use('/todo', todoRoutes);

module.exports = router;