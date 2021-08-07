const { getProfile, postProfile, getProfiles, getSingleProfile, deleteProfile, addEdu, deleteEducation, addExperience, deleteExperience, updateExperience, updateEducation, getExperience, getAllEducation } = require('../controller/ProfileController');
const auth = require('../middleware/auth');
const eduValidator = require('../validator/EduValidator');
const ProfileValidator = require('../validator/ProfilePostValidator');

const router = require('express').Router();

router.get('/me', auth, getProfile); // Get profile with Login
router.post('/', auth, ProfileValidator, postProfile); // Create new profile
router.get('/', getProfiles); // Get all Profile
router.get('/:profileId', getSingleProfile); // Get single Profile
router.delete('/', auth, deleteProfile); // Delete Profile

router.get('/education/all', auth, getAllEducation)
router.post('/addEdu', eduValidator, auth, addEdu); // Add Education
router.put('/education/:id', auth, eduValidator, updateEducation); // Update Education
router.delete('/edu/:id', auth, deleteEducation); // Delete Education

router.get('/experience/all', auth, getExperience); // Get all Experience
router.post('/experience', auth, addExperience); // Add Experience
router.delete('/experience/:id', auth, deleteExperience); // Delete Experience
router.put('/experience/:id', auth, updateExperience); // Update experience

module.exports = router;