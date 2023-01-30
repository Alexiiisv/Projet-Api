const User = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const main = require("../config/mail");
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
    .then((data) => {
      let sender = `"${firstName.concat(" ", lastName)}" <${email}>`;
      let receiver = "admin@projapi.com";
      let content = `${firstName.concat(
        " ",
        lastName
      )} vient de se créer un compte.`;
      let subject = "création de compte";
      main(sender, receiver, content, subject);
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
    if (!user) return res.status(400).json({ msg: "User not exist" });

    bcrypt.compare(password, user.password, (err, data) => {
      if (err) throw err;
      if (data) {
        let token = jwt.sign(
          {
            id: user.id,
            isAdmin: user.isAdmin,
          },
          process.env.PRIVATE_KEY
        );
        return res
          .status(200)
          .json({ msg: "Login success", userId: user.id, token: token });
      } else {
        return res.status(401).json({ msg: "Invalid credencial" });
      }
    });
  });
};
