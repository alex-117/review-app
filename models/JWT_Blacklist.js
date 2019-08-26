// import db connection
const connection = require('../config/connection');

// JWT_Blacklist model
const JWT_Blacklist = {
  // add - user logout
  add: token => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO jwt_blacklist (token) VALUES (?)";

      connection.query(query, [token], (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  },
  // search - during any protected (auth) route
  search: token => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM jwt_blacklist WHERE token = ?";

      connection.query(query, [token], (error, response) => {
        if (error) return reject(error);
        resolve(response);
      });
    });
  }
};

module.exports = JWT_Blacklist;
