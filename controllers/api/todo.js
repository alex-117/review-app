// modules
const router = require('express').Router();
const jwtVerification = require('../../middleware/jwt-verification');
const Todo = require('../../models/Todo');

// endpoint: /api/todo/all
router.get('/all', jwtVerification, async (request, response) => {
  // jwtVerification should handle user auth,
  // if user exists - user session will exist on request.user
  const { _id } = request.user;

  // once we have the id, we want to query the db for associated todos
  try {
    // an array will be returned by the Todo.all query
    const allTodos = await Todo.all(_id);
    response.status(200).json(allTodos);
  } catch (error) {
    response.status(400).send('Error: Could not get todos.');
  }
});

// endpoint: /api/todo/create
router.post('/create', jwtVerification, async (request, response) => {
  const { todo } = request.body;
  const { _id } = request.user;

  try {
    await Todo.create(todo, _id);
    const allTodos = await Todo.all(_id);
    response.status(200).json(allTodos);
  } catch (error) {
    response.status(400).send('Error: Could not add todo.');
  }
});

// endpoint: /api/todo/update
router.put('/update', jwtVerification, async (request, response) => {
  const { todoId } = request.body;
  const { _id } = request.user;
  console.log({todoId, _id})

  try {
    await Todo.update(todoId, _id);
    const allTodos = await Todo.all(_id);
    response.status(200).json(allTodos);
  } catch (error) {
    response.status(400).send('Error: Could not update todo.');
  }
});

// endpoint: /api/todo/destroy
router.delete('/destroy', jwtVerification, async (request, response) => {
  const { todoId } = request.body;
  const { _id } = request.user;

  try {
    await Todo.destroy(todoId, _id);
    const allTodos = await Todo.all(_id);
    response.status(200).json(allTodos);
  } catch (error) {
    response.status(400).send('Error: Could not delete todo.');
  }
});

module.exports = router;