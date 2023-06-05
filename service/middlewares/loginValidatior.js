const { body, validationResult } = require("express-validator");
const pool = require("../db/database");
const bcrypt = require('bcrypt')
const loginValidationRules = () => {
	return [
    	body("email").custom(async (value) => {
      		const user = await pool.query("SELECT * FROM users WHERE email=$1", [value])
      		if (user.rows.length) {
        		return true
      		}
      		return Promise.reject("Wrong email")
    	}),
		body(["email", "password"]).custom(async (value, {req, location, path}) => {
	
      		const user = await pool.query("SELECT * FROM users WHERE email=$1", [req.body.email])
			const success = await bcrypt.compare(req.body.password, user.rows[0].password);

			if (success) {
				return true;
			}
      		return Promise.reject("Wrong password")
    	}),
  	]
}

const validateLogin = (req, res, next) => {
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
  loginValidationRules,
  validateLogin,
};
