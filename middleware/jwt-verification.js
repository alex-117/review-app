// build a middleware to authenticate the user
const jwt = require('jsonwebtoken');
const JWT_Blacklist = require('../models/JWT_Blacklist');

const jwtVerification = async (request, response, next) => {
  // check that the token we are receiving from Auth. cookie is valid
  try {
    // check if the cookie even exists
    const token = request.cookies.Authorization;
    if (!token) throw new Error();

    // check if token is blacklisted
    const isBlacklisted = await JWT_Blacklist.search(token);
    if (isBlacklisted.length) throw new Error();
    
    // check if token is valid
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedUser) throw new Error();

    // if token is valid - set request.user = verifiedUser
    request.user = verifiedUser;

    next();
  } catch {
    // if token verification fails, set the session user to null
    request.user = null;
    console.error('Invalid Token');
    
    // redirect user to login page
    return response.status(401).render('index');
  }
};

module.exports = jwtVerification;