const { validationResult } = require("express-validator");
const Profile = require("../models/Profile");
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
 * @Route /api/profile/me
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
 * @Route /api/profile
 */
exports.postProfile = async (req, res) => {
    const errors = validationResult(req).formatWith(err => err.msg);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.mapped()
        });
    }

    const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body;

    let profileFields = {};
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
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
        }

        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal server error"
        });
    }

};