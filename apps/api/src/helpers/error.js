class AppError extends Error {
	constructor(statusCode, message) {
		super(message);
		super.status = statusCode;
	}
}

exports.routeNotFound = (req, res, next) => {
	let notFoundError = new AppError(404, 'The API endpoint you are looking for does not exist.');
	next(notFoundError);
};

exports.errorLogger = (err, req, res, next) => {
	console.error(err.stack);
	next(err);
};

exports.errorHandler = (err, req, res, next) => {
	res.status(err.status || 500);
	res.json({ error: err.status != 500 ? err.message : 'Internal server error' });
};

exports.AppError = AppError;
