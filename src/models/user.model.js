const mongoose = require("mongoose");

// var validateEmail = function (email) {
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email);
// };

const userSchema = mongoose.Schema(
  {
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 30,
      minLength: 3,
    },
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 30,
      minLength: 3,
    },
    address: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 30,
      minLength: 3,
    },
    city: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 30,
      minLength: 3,
    },
    zipCode: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 30,
      minLength: 3,
    },
    phone: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 30,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      length: 50,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
// userSchema.path("email").validate(function (email) {
//   var emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.(?:^|\W)com(?:$|\W)$/;
//   console.log(emailRegex.test(email));
//   return emailRegex.test(email); // Assuming email has a text attribute
// }, "The e-mail field cannot be empty.");

module.exports = mongoose.model("User", userSchema);
