const User = require("../models/user.model");
const Business = require("../models/business.model");
const Freelance = require("../models/freelance.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .populate("isBusiness")
    .populate("isFreelance")
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
  User.findById(req.userToken.id).then((user) => {
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
  User.find().then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "no user found",
      });
    } else {
      res.send(user);
    }
  });
};

exports.setFreelance = (req, res) => {
  const { freelanceID, userID } = req.body;
  User.findByIdAndUpdate(userID, { isFreelance: freelanceID }).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "no user found",
      });
    }
    if (user.isBusiness != null || user.isFreelance != null) {
      return res.status(404).send({
        message:
          "L'utilisateur est déjà relié a une entreprise ou bien une freelance, ce n'est pas possible de changer.",
      });
    }
    Freelance.findById(freelanceID).then((freelance) => {
      if (!freelance) {
        return res.status(404).send({
          message: "no freelance found",
        });
      }
    });
    res.send(user);
  });
};

exports.setBusiness = (req, res) => {
  const { businessID, userID } = req.body;
  User.findByIdAndUpdate(userID, { isBusiness: businessID }).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "no user found",
      });
    }
    if (user.isBusiness != null || user.isFreelance != null) {
      return res.status(404).send({
        message:
          "L'utilisateur est déjà relié a une entreprise ou bien une freelance, ce n'est pas possible de changer.",
      });
    }
    Business.findById(businessID).then((business) => {
      if (!business) {
        return res.status(404).send({
          message: "no freelance found",
        });
      }
    });
    res.send(user);
  });
};
