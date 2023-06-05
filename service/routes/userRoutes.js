const pool = require("../db/database");

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		return (await pool.query('SELECT * FROM users WHERE id=$1', [id])).rows[0];
	} catch (err) {
		res.json("Message: ", err);
	}
})