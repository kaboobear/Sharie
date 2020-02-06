const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.login = !isEmpty(data.login)
        ? data.login
        : "";
    data.mail = !isEmpty(data.mail)
        ? data.mail
        : "";
    data.pass = !isEmpty(data.pass)
        ? data.pass
        : "";
    data.password2 = !isEmpty(data.pass2)
        ? data.pass2
        : "";

    if (Validator.isEmpty(data.login)) 
        errors.login = "Name field is required";
    
    if (Validator.isEmpty(data.mail)) 
        errors.mail = "Email field is required";
    else if (!Validator.isEmail(data.mail)) 
        errors.mail = "Email is invalid";
    
    if (Validator.isEmpty(data.pass)) 
        errors.pass = "Password field is required";
    if (Validator.isEmpty(data.pass)) 
        errors.pass2 = "Confirm password field is required";
    if (!Validator.isLength(data.pass, {
        min: 6,
        max: 30
    })) 
        errors.pass = "Password must be at least 6 characters";
    if (!Validator.equals(data.pass, data.pass2)) 
        errors.pass2 = "Passwords must match";
    
    return {errors, isValid: isEmpty(errors)};
};