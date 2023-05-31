const jwt = require("jsonwebtoken");
function authorize() {
	return [
		(req, res, next) => {
			const claims = jwt.decode(req.header("Authorization"));
			const hasExpired = claims.exp
			if (claims.exp < Date.now() / 1000) {
				return res.status(401).json({ message: "Unauthorized" });
			}
			next();
		},
	];
}

module.exports = authorize;
