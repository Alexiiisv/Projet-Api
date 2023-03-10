const User = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Email = require("../config/mail");
const saltRounds = 10;

exports.register = (req, res) => {
  const {
    firstName,
    lastName,
    address,
    city,
    zipCode,
    phone,
    email,
    password,
  } = req.body;
  var passwordHash = bcrypt.hashSync(password, saltRounds);
  const newUser = new User({
    firstName,
    lastName,
    address,
    city,
    zipCode,
    phone,
    email,
    password: passwordHash,
  });
  newUser
    .save()
    .then(async (data) => {
      let user = `"${firstName.concat(" ", lastName)}" <${email}>`;
      let admin = "admin@projapi.com";
      let adminContent = `${firstName.concat(
        " ",
        lastName
      )} vient de se créer un compte.`;
      let userContent = `Bonjour ${firstName.concat(" ", lastName)},
      
      Votre compte vient d'être créer, bonne journée.`;
      let subject = "création de compte";
      console.log("\nEmail Admin");
      await Email(user, admin, adminContent, subject);
      console.log("\nEmail User");
      await Email(admin, user, userContent, subject);
      res.send({ msg: "Compte créer", user: data });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    email: email,
  }).then((user) => {
    if (!user) return res.status(400).json({ msg: "L\'utilisateur n'existe pas" });

    bcrypt.compare(password, user.password, (err, data) => {
      if (err) throw err;
      if (data) {
        let token = jwt.sign(
          {
            id: user.id,
            isAdmin: user.isAdmin,
            isBusiness: user.isBusiness,
            isFreelance: user.isFreelance,
          },
          process.env.PRIVATE_KEY
        );
        return res
          .status(200)
          .json({ msg: "Réussite de la connexion du compte", userId: user.id, token: token });
      } else {
        return res.status(401).json({ msg: "Identifiant invalide" });
      }
    });
  });
};
