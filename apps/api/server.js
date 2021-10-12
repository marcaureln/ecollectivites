const app = require('./app');

const port = process.env.PORT || 3000;

const listener = app.listen(port, () => {
	console.log('Your app is listening on port ' + listener.address().port);
});
