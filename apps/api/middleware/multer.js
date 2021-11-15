const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const destination = 'uploads';

if (!fs.existsSync(destination)) {
	fs.mkdirSync(destination);
}

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, destination);
	},
	filename: (req, file, callback) => {
		const originalname = file.originalname.split(' ').join('_');
		const namesplit = originalname.split('.');
		const ext = namesplit[namesplit.length - 1];
		namesplit.pop();
		callback(null, `${namesplit.join('')}-${uuidv4()}.${ext}`);
	},
});

module.exports = multer({ storage: storage }).array('attachements');
