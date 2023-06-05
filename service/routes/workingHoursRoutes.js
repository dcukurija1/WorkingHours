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
	console.log(req.body)
	const { date, duration, report } = req.body;
	console.log({date,  duration, report})
	try {
		await pool.query("INSERT INTO hours_event(user_id, date, duration, report) VALUES($1,$2,$3, $4)", [id,date, duration, report]);
		res.send("OK");
	} catch (err) {

		res.status(400).json({ "Message: ": err })
	}
})

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const rows = await pool.query("DELETE FROM hours_event WHERE id=$1", [id]);
		res.send("Deleted")
	} catch (err) {
		res.status(500).json({"Message": err.message})
	}
})

module.exports = router