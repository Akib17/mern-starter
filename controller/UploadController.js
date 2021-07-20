const User = require("../models/User");

/**
 * @Desc Image upload
 * @Route api/upload/avatar
 * @method POST
 * @access private
 */
exports.uploadImage = async (req, res) => {
    if (req.file) {
        try {
            const user = await User.findById(req.user.id);
            const oldAvatar = user.avatar;

            user.avatar = `/uploads/${req.file.filename}`;
            await user.save();

            if (!oldAvatar.includes('/www.gravatar.com')) {
                fs.unlink(`public/${oldAvatar}`, err => {
                    if (err) console.log(err);
                });
            }

            res.status(200).json({
                msg: "Profile picture uploaded successfully",
                avatar: user.avatar
            });

        } catch (err) {
            console.log(err.message);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    } else {
        console.log('Req.file error: ' + req.file);
        res.status(500).json({
            msg: 'Upload failed',
            error: 'Internal server error'
        });
    }
};