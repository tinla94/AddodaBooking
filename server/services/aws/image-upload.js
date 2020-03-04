const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');


const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-1'
});

console.log(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY)

const checkFileType = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg/jpg/png/gif' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG, JPG and PNG are allowed!'), false);
  }
}



// single image upload
exports.singleImageUpload = multer({
  checkFileType,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'overnightbooking-bucket',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now().toString() + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 2000000 }
});


// multiple images upload
exports.multipleImageUpload = multer({
  checkFileType,
  storage: multerS3({
    s3,
    bucket: 'overnightbooking-bucket',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now().toString() + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 2000000 }
}).array('multipleImage', 4);


