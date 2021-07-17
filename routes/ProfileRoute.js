const { getProfile, postProfile, getProfiles, getSingleProfile, deleteProfile, addEdu } = require('../controller/ProfileController');
const auth = require('../middleware/auth');
const eduValidator = require('../validator/EduValidator');
const ProfileValidator = require('../validator/ProfilePostValidator');

const router = require('express').Router();

router.get('/me', auth, getProfile); // Get profile with Login
router.post('/', auth, ProfileValidator, postProfile); // Create new profile
router.get('/', getProfiles); // Get all Profile
router.get('/:profileId', getSingleProfile); // Get single Profile
router.delete('/', auth, deleteProfile); // Delete Profile
router.post('/addEdu', eduValidator, auth, addEdu); // Add Education

module.exports = router;