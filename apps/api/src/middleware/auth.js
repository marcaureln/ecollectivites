const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_AUTH_SECRET;

module.exports = function auth(req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
			return res.status(403).send();
		}

		const decodedToken = jwt.verify(token, JWT_SECRET);

		if (!decodedToken.userId) {
			res.status(401).send();
		} else {
			req.auth = { userId: decodedToken.userId };
			next();
		}
	} catch {
		res.status(401).send();
	}
};
