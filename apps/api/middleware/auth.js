const jwt = require('jsonwebtoken');
const jwtAuthSecret = process.env.JWT_AUTH_SECRET;

exports.userAuth = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
			return res.status(403).send();
		}

		const decodedToken = jwt.verify(token, jwtAuthSecret);

		if (req.body.user_id && req.body.user_id !== decodedToken.user_id) {
			res.status(401).send();
		} else {
			next();
		}
	} catch {
		res.status(401).send();
	}
};
