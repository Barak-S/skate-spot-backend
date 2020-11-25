const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = function verifyUserAndUpdate(data) {
  let errors = {};
  
  data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : "";
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";

  if (Validator.isEmpty(data.oldPassword)) {
    errors.oldPassword = "Old password field is required";
  }
  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = "New password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};