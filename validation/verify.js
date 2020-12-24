const Validator = require("validator");
const isEmpty = require("is-empty");

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