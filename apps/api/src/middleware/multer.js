const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

let storage;

if (process.env.DO_SPACES_ENDPOINT) {
  const endpoint = new aws.Endpoint(process.env.DO_SPACES_ENDPOINT);

  storage = multerS3({
    s3: new aws.S3({
      endpoint,
      accessKeyId: process.env.DO_SPACES_KEY,
      secretAccessKey: process.env.DO_SPACES_SECRET,
    }),
    acl: 'public-read',
    bucket: process.env.DO_SPACES_NAME,
    key: (req, file, callback) => {
      const originalname = file.originalname.split(' ').join('_');
      const namesplit = originalname.split('.');
      const ext = namesplit[namesplit.length - 1];
      namesplit.pop();
      callback(null, `${namesplit.join('')}-${uuidv4()}.${ext}`);
    },
  });
} else {
  const destination = path.join(__dirname, '../../uploads');

  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  storage = multer.diskStorage({
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
}

module.exports = multer({ storage }).array('attachements');
