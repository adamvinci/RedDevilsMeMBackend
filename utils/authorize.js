const jwt = require('jsonwebtoken');
const { readOneFromUserName } = require('../models/users');

const jwtSecret = 'ilovemybelgium!';

const authorize = (req, res, next) => {
  const { token } = req.session;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { username } = decoded;

    const existingUser = readOneFromUserName(username);

    if (!existingUser) return res.sendStatus(401);

    req.user = existingUser; // request.user object is available in all other middleware functions
    return next();
  } catch (err) {
    return res.sendStatus(401);
  }
};

const isAdmin = (req, res, next) => {

  if (req.user.isAdmin === 1) return res.sendStatus(403);
  return next();
};

module.exports = { authorize, isAdmin };
