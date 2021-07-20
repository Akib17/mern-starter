const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Upto 5 mb
    },
    fileFilter: (req, file, cb) => {
        const types = /jpeg|jpg|png|gif/
        const extName = types.test(
            path.extname(file.originalname).toLowerCase()
        )
        const mimeType = types.test(file.mimetype)

        if (extName && mimeTypes) {
            cb(null, true)
        } else {
            cb(new Error('Only Image'))
        }
    }
});

module.exports = upload