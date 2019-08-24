// we need a method of interacting with the db
const connection = require('../config/connection');

// we need some sort model to interact with the db
const User = {
  // user create method
  create: ({ first_name, last_name, email, hashedPassword }) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
      connection.query(query, [first_name, last_name, email, hashedPassword], (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  },
  // user findOne method
  findOne: email => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM user WHERE email = ?";
      connection.query(query, [email], (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  }
};

module.exports = User;