const { body, validationResult } = require("express-validator");

const pool = require("../db/database");
const registerValidationRules = () => {
  return [
	  body("email").custom(async (value) => {
      const user = await pool.query("SELECT * FROM users WHERE email=$1", [value]);
      if (user.rows.length) {
        return Promise.reject("E-mail already in use");
      }
      return true;
    }),
    body('email').isEmail(),
    body("password").isLength({ min: 6 }),
    body("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ]
}

const validateRegister = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  registerValidationRules,
  validateRegister,
};
