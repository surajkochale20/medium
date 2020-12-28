const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

auth = async function (req, res, next) {
    try {
        let token;

        if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            return next(res.status(401).json({ err: 'You are not authorized to access this resource.'}));
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next( res.status(404).send('User no longer exist.' ) );
        }

        req.user = currentUser;
        next();
    } catch (e) {
        return res.status(400).send("Inavid token");
    }

};

module.exports = auth;