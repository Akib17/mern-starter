const { uploadImage } = require('../controller/UploadController');
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadMiddleware');

const router = require('express').Router()

router.post('/avatar', auth, upload.single('avatar'), uploadImage) // Image upload

module.exports = router