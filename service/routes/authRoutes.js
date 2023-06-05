const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { loginValidationRules, validateLogin } = require("../middlewares/loginValidatior");
const { registerValidationRules, validateRegister } = require("../middlewares/registerValidator");
const pool = require("../db/database");


// REGISTER
router.post(
	"/register",
	registerValidationRules(),
	validateRegister,
	async (req, res) => {
		const { email, password, name } = req.body

		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);

		try {
			const userId = await pool.query("INSERT INTO users(email, password, name) VALUES($1,$2,$3) RETURNING users.id",
				[email, hashedPassword, name])

			const token = jwt.sign({ userId, email }, "secret", { expiresIn: "1hr" });
			res.json({userId, email, name, token });
	
		} catch (err) {

			res.status(500).json({ "Message": err });
		}
	}
);

// LOGIN
router.post(
	"/login",
	loginValidationRules(),
	validateLogin,
	async (req, res) => {
		const { email, password } = req.body;
		try {
			// get user by email
			const users = await pool.query("SELECT * FROM users WHERE email = $1", [
				email
			]);

			if (!users.rows.length)
				return res.json({ detail: "User does not exist!" });
			// check passwords
			const success = await bcrypt.compare(
				password,
				users.rows[0].password
			);
			const id = users.rows[0].id;
			const token = jwt.sign({ id, email }, "secret", { expiresIn: "1hr" });

			if (success) {
				res.json({ id, email: users.rows[0].email, name: users.rows[0].name, token });
			} else {
				res.status(400).json({ detail: "Login failed" });
			}
		} catch (err) {
			console.log(err)
			res.status(500).json({ "Message": err });
		}
	}
);

module.exports = router;
