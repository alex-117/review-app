// db connection
const connection = require('../config/connection');

// db Todo model
const Todo = {
  all: userId => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM todos WHERE user_id = ?";

      connection.query(query, [userId], (error, response) => {
        if (error) return reject(error);
        resolve(response);
      })
    })
  },
  create: (todo, userId) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO todos (todo, user_id) VALUES (?, ?)";

      connection.query(query, [todo, userId], (error, response) => {
        if (error) return reject(error);
        resolve(response);
      })
    })
  },
  update: (todoId, userId) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE todos SET completed = !completed WHERE id = ? AND user_id = ?";

      connection.query(query, [todoId, userId], (error, response) => {
        if (error) return reject(error);
        if (!response.changedRows) return reject('Todo not found');

        resolve();
      })
    })
  },
  destroy: (todoId, userId) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM todos WHERE id = ? AND user_id = ?";

      connection.query(query, [todoId, userId], (error, response) => {
        if (error) return reject(error);
        resolve(response);
      })
    })
  }
};


module.exports = Todo;