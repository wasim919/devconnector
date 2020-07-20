const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
// @route GET api/auth
// @desc Test route
// @access Public 
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/',
[ 
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Enter valid password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res
        .status(400)
        .json({errors: errors.array()});
    } 
    const {email, password} = req.body;
    try {
        console.log('hello');
        let user = await User.findOne({email});
        console.log('hello');
        if(!user) {
            console.log('inside user error');
            return res
            .status(400)
            .json({errors: [{
                msg: 'Invalid credentials'
            }]});
        }
        console.log('outside user error');
        const isMatch = bcrypt.compare(password, user.password);   
        if(!isMatch) {
            console.log('Inside match');
            return res
            .status(400)
            .json({errors: [{
                msg: "Invalid credentials"
            }]});
        }
        console.log('outside match');
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get("jwtSecret"),
            {expiresIn: 36000},
            (err, token) => {
                if(err) {
                    throw err;
                }
                res.json({token});
            }
        );
    } catch(err) {
        console.log(err.message);
        res
        .status(500)
        .send('Server error');
    }
});
module.exports = router;