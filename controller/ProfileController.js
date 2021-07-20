const { validationResult } = require("express-validator");
const Education = require("../models/Education");
const Post = require("../models/Post");
const Profile = require("../models/Profile");
const User = require("../models/User");
const ProfileValidator = require("../validator/ProfilePostValidator");

const isProfileComplete = profile => {
    let isComplete = true;

    if (!profile.company) isComplete = false;
    if (!profile.website) isComplete = false;
    if (!profile.location) isComplete = false;
    if (!profile.status) isComplete = false;
    if (!profile.bio) isComplete = false;
    if (!profile.githubusername) isComplete = false;
    if (!profile.skills && profile.skills.length === 0) isComplete = false;
    if (!profile.experience && profile.experience.length === 0) isComplete = false;
    if (!profile.education && profile.education.length === 0) isComplete = false;
    return isComplete;
};

/**
 * @desc Get single Profile After Login
 * @method GET
 * @Route /api/profile/me
 * @access private
 */
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);

        if (!profile) {
            return res.status(404).json({
                msg: 'There is no profile for this user'
            });
        }

        res.json({ ...profile._doc, isComplete: isProfileComplete(profile) });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
};


/**
 * @desc Create new Profile/ Update Profile
 * @method POST
 * @Route /api/profile
 * @access private
 */
exports.postProfile = async (req, res) => {
    const errors = validationResult(req).formatWith(err => err.msg);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.mapped()
        });
    }

    const { company, website, location, bio, education, experience, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body;

    let profileFields = {};

    if (req.user) profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (experience) profileFields.experience = experience;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    };
    if (youtube) profileFields.youtube = youtube;
    if (facebook) profileFields.facebook = facebook;
    if (twitter) profileFields.twitter = twitter;
    if (instagram) profileFields.instagram = instagram;
    if (linkedin) profileFields.linkedin = linkedin;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            res.status(201).json(profile);
        } else {
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal server error"
        });
    }

};

/**
 * @desc Get all Profiles
 * @method GET
 * @route /api/profile
 * @access public
 */
exports.getProfiles = async (req, res) => {
    try {
        let profiles = await Profile.find().populate('user', ['name', 'email']);

        profiles = profiles.map(profile => ({
            ...profile._doc,
            isComplete: isProfileComplete(profile)
        }));

        res.status(200).json(profiles);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};


/**
 * @method GET
 * @route /api/profile/:id
 * @access Public
 */
exports.getSingleProfile = async (req, res) => {
    try {
        const { profileId } = req.params;
        const profile = await Profile.findById(profileId).populate('user', ['name', 'email']).populate('education');

        if (!profile) {
            res.status(400).json({
                msg: "Profile not found"
            });
        }

        res.status(200).json({ ...profile._doc, isComplete: isProfileComplete(profile) });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal Server error"
        });
    }
};


/**
 * @method POST
 * @route api/profile/:deleteId
 * @access private
 */
exports.deleteProfile = async (req, res) => {
    try {
        // Delete all post for this user
        await Post.deleteMany({ user: req.user.id });
        // Delete profile 
        await Profile.findOneAndRemove({ user: req.user.id });
        // Delete user
        await User.findOneAndRemove({ _id: req.user.id });

        res.status(204).send();

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }

};


/**
 * @desc Add education
 * @method POST 
 * @route api/profile/addEdu
 * @access private
 */
exports.addEdu = async (req, res) => {
    const { school, degree, fieldofstudy, from, to, current, description } = req.body;

    try {
        let newEdu = { school, degree, fieldofstudy, from, to, current, description };
        let edu = new Education(newEdu);
        await edu.save();

        await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $push: { 'education': edu.id } }
        );

        res.status(200).json(edu);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};