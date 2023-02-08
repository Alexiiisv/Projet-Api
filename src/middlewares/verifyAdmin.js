const jwt = require("jsonwebtoken");

function verifyAdmin(req, res, next) {
  if (!req.userToken.isAdmin) {
    return res.status(403).send("Vous n'etes pas autorisée pour utiliser cette fonctionalité.");
  }
  next();
}

module.exports = verifyAdmin;
