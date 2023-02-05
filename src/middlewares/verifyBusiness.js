const jwt = require("jsonwebtoken");

function verifyAdmin(req, res, next) {
  if (!req.userToken.isBusiness) {
    return res.status(403).send("You are not allowed to access this feature. You need to be linked to a Business to use it");
  }
  next();
}

module.exports = verifyAdmin;
