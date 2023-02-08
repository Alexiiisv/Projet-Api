const jwt = require("jsonwebtoken");

function verifyAdmin(req, res, next) {
  if (!req.userToken.isBusiness) {
    return res.status(403).send("Vous n'êtes pas autorisée pour utiliser cette fonctionnalité. Vous devez être une entreprise pour y avoir accès.");
  }
  next();
}

module.exports = verifyAdmin;
