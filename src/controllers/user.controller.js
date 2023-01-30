const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "no user found",
        });
      }
      res.send({
        user: user,
      });
    });
};

exports.getUserInfo = (req, res) => {
  User.findById(req.userToken.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "no user found",
        });
      }
      res.send({
        user: user,
      });
    });
};

exports.deleteUserById = (req, res) => {
  User.findByIdAndRemove(req.params.id).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "no user found",
      });
    }
    res.send(user);
  });
};

exports.updateUserById = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  var passwordHash = bcrypt.hashSync(password, saltRounds);

  User.findByIdAndUpdate(req.params.id, {
    firstName,
    lastName,
    email,
    passwordHash,
  }).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "no user found",
      });
    }
    res.send(user);
  });
};

exports.getAllUser = (_, res) => {
  User.find()
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "no user found",
        });
      } else {
        res.send(user);
      }
    });
};
