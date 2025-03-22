const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const crypto = require('crypto');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    // const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(4).toString('hex');
    // callback(null, name + '_' + uniqueSuffix + '.' + extension);
    const uniqueName = crypto.randomUUID(); // Nom unique basé sur un UUID
    callback(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage: storage}).single('image');

const resizeImg = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const filePath = `images/${req.file.filename}`;
  // const outputFilePath = `images/resized_${req.file.filename.split('.')[0]}.webp`;
  const outputFilePath = `images/resized_${crypto.randomUUID()}.webp`;

  sharp(filePath)
    .resize({
      width: 480,
      height: 600,
      fit: sharp.fit.inside,
      withoutEnlargement: true
    })
    .webp()
    .toFile(outputFilePath, (err, info) => {
      if (err) {
        return next(err);
      }
      
      fs.unlink(filePath, (err) => { // delete image originale si besoin
        if (err) {
          return next(err);
        }

        req.file.path = outputFilePath; // update chemin du fichier dans la requête
        // req.file.filename = `resized_${req.file.filename.split('.')[0]}.webp`;
        req.file.filename = outputFilePath.split('/').pop();
        next();
      });
    });
};

module.exports = { upload, resizeImg };
