// build a middleware to authenticate the user
const jwt = require('jsonwebtoken');

const jwtVerification = async (request, response, next) => {
  // check that the token we are receiving from Auth. cookie is valid
  console.log('hit middleware jwt')
  // check if the cookie even exists
  const token = request.cookies.Authorization;
  // if (!token) throw new Error();
  if (!token) console.log('bad token');


  // check if token is blacklisted


  // check if token is valid
  const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
  console.log("TCL: jwtVerification -> verifiedUser", verifiedUser)
  if (!verifiedUser) console.log('bad token verification');

  // if token is valid - set request.user = verifiedUser
  request.user = verifiedUser;
  next();
};

module.exports = jwtVerification;