const { getProfile, postProfile } = require('../controller/ProfileController');
const auth = require('../middleware/auth');
const ProfileValidator = require('../validator/ProfilePostValidator');

const router = require('express').Router();

router.get('/me', auth, getProfile);
router.post('/', auth, ProfileValidator, postProfile);

module.exports = router;