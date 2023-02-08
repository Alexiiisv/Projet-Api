const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(403).send("Il n'y a pas de token");
  }
  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.PRIVATE_KEY, function (err, jwtDecoded) {
    if (err) {
      return res.status(401).send({
        auth: false,
        token: null,
        message: "Pas autorisé.",
      });
    }
    req.userToken = jwtDecoded;
    next();
  });
}

module.exports = verifyToken;
