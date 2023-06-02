const pool = require("../db/database");
const express = require("express");
const router = express.Router();
const dayjs = require('dayjs');
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const hours = await pool.query("SELECT * FROM hours_event WHERE user_id=$1", [id]);
		res.json(hours.rows);
	} catch (err) {
		res.status(500).json({ "Message: ": err });
	}
});

router.post("/:id", async (req, res) => {
	const { id } = req.params;
	const { date, duration, report } = req.body;
	try {
		await pool.query("INSERT INTO hours(user_is, date, duration, report) VALUES($1,$2,$3, $4)", [id,date, duration, report]);
		res.send("OK");
	} catch (err) {
		console.log(err)
		res.status(400).json({ "Message: ": err })
	}
})

module.exports = router