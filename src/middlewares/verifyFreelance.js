const jwt = require("jsonwebtoken");

function verifyFreelance(req, res, next) {
  if (!req.userToken.isFreelance) {
    return res.status(403).send("You are not allowed to access this feature. You need to be linked to a Freelance to use it");
  }
  next();
}

module.exports = verifyFreelance;
