const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Authorization failed. No token found'
        });
    }
    // Verify token
    try {
        const decode = jwt.verify(token, config.get('jwt_secret'));

        // Set req.user from payload
        req.user = decode.user;
        // To continue through middleware
        next();
    } catch (err) {
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
};

module.exports = auth