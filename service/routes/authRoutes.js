const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { loginValidationRules, validateLogin } = require("../middlewares/loginValidatior");
const { registerValidationRules, validateRegister } = require("../middlewares/registerValidator");
const pool = require("../db/database");

router.get('/', async (req, res) => {
	console.log("was here")
	res.send("was here");
})
// REGISTER
router.post(
	"/register",
	registerValidationRules(),
	validateRegister,
	async (req, res) => {
		const { email, password, name } = req.body
		console.log("here");
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);
		console.log("here2");
		try {
			const userId = await pool.query("INSERT INTO users(email, password, name) VALUES($1,$2,$3) RETURNING users.id",
				[email, hashedPassword, name])
			console.log("here3");
			const token = jwt.sign({ userId, email }, "secret", { expiresIn: "1hr" });
			res.json({ email, token });
			console.log("here4");
		} catch (err) {
			console.log(err)
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
				res.json({ email: users.rows[0].email, token });
			} else {
				res.json({ detail: "Login failed" });
			}
		} catch (err) {
			console.log(err)
			res.status(500).json({ "Message": err });
		}
	}
);

module.exports = router;
