let signup = function (req, res, next) {
	res.status(200).send('/api/auth/signup');
};

let login = function (req, res, next) {
	res.status(200).send('/api/auth/login');
};

module.exports = { signup, login };
