const jwt = require("jsonwebtoken");

function verifyAdmin(req, res, next) {
  if (!req.userToken.isAdmin) {
    return res.status(403).send("You are not allowed to access this feature.");
  }
  next();
}

module.exports = verifyAdmin;
