const jwt = require("jsonwebtoken");

function verifyFreelance(req, res, next) {
  if (!req.userToken.isFreelance) {
    return res.status(403).send("Vous n'êtes pas autorisée pour utiliser cette fonctionnalité. Vous devez être un freelance pour y avoir accès.");
  }
  next();
}

module.exports = verifyFreelance;
