const { validationResult } = require("express-validator");
const User = require("../models/User");
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { getActivationTemplate, getWelcomeMailTemplate, getPasswordResetTemplate, getPasswordResetSuccessTemplate } = require("../email/template");
const transporter = require("../email/transporter");
const sendSMS = require('../sms');

exports.signupController = async (req, res) => {

    const { email, name, phone, password } = req.body;

    const errors = validationResult(req).formatWith(err => err.msg);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped()
        });
    }

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({
            errors: {
                msg: 'User already exists'
            }
        });

        const avatar = gravatar.url('email', {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name, email, phone, avatar
        });

        const activationToken = jwt.sign(
            { email: user.email },
            config.get('jwt_secret')
        );

        user.activationToken = activationToken;

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: user.email,
            subject: `${name} - Activate your account`,
            html: getActivationTemplate(activationToken)
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        const payload = {
            user: {
                id: user._id
            }
        };

        jwt.sign(payload, config.get('jwt_secret'), { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.log(err.message);
        res.json({
            msg: err.message
        });
    }

};

// Account Verify and activation
exports.activateAccount = async (req, res) => {
    const { activationToken } = req.params;

    try {
        const { email } = jwt.verify(activationToken, config.get('jwt_secret'));

        const user = await User.findOne({ email });

        if (user.isActive) {
            return res.status(400).json({
                msg: 'Activation Failed',
                error: 'Already Active user'
            });
        } else {
            user.isActive = true;
            user.activationToken = '';
            await user.save();

            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: user.email,
                subject: 'Welcome to our website',
                html: getWelcomeMailTemplate(user)
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });

            if (user.phone) {
                sendSMS(user.phone, 'Welcome to our website')
                    .then(msg => console.log(msg))
                    .catch(err => console.log(err));
            }

            res.status(200).json({
                msg: 'Activation successful'
            });

        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: 'Activation failed',
            error: 'Invalid Token'
        });
    }
};

/**
 * @route POST(api/auth/login)
 */
exports.loginController = async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req).formatWith(err => err.msg);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped()
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Credential not match'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({
            msg: "Credential not match"
        });

        if (!user.isActive) {
            return res.status(400).json({
                error: {
                    msg: 'Account is not active. Please check your mail'
                }
            });
        }

        const payload = {
            user: {
                id: user._id
            }
        };

        jwt.sign(payload, config.get('jwt_secret'), { expiresIn: 60 * 60 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        res.status(500).send('Server Error');
    }

};


/**
 * @route POST(api/auth/password/reset/request)
 */
exports.passwordResetRequest = async (req, res) => {
    const { email } = req.body;

    try {

        const errors = validationResult(req).formatWith(err => err.msg);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.mapped()
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: {
                    msg: 'User not found'
                }
            });
        }

        const passwordResetToken = jwt.sign({ email: user.email }, config.get('jwt_secret'));
        user.passwordResetToken = passwordResetToken;
        await user.save();

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: user.email,
            subject: 'Your password reset request',
            html: getPasswordResetTemplate(passwordResetToken)
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent to: ' + info.response);
            }
        });

        res.status(200).json({
            msg: 'Success, Please check your email'
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: {
                msg: 'Invalid server error'
            }
        });
    }
};


/**
 * @route POST(/auth/password/verify/:passwordResetToken)
 */
exports.passwordResetVerify = async (req, res) => {
    const { passwordResetToken } = req.params;
    const { password } = req.body;

    try {
        const errors = validationResult(req).formatWith(err => err.msg);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.mapped()
            });
        }

        const { email } = jwt.verify(passwordResetToken, config.get('jwt_secret'));

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: {
                    msg: "User not found"
                }
            });
        }

        if (!user.passwordResetToken) {
            return res.json({
                error: {
                    msg: "Invalid Token"
                }
            })
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        user.passwordResetToken = '';

        await user.save();

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: user.email,
            subject: 'Password reset successful',
            html: getPasswordResetSuccessTemplate(user)
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent to: ' + info.response);
            }
        });

        res.status(200).json({
            msg: 'Your password has been updated'
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: {
                msg: "Invalid server error"
            }
        });
    }
};