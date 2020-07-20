const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const config = require('config');
const request = require('request');
const {check, validationResult} = require('express-validator');
// @route GET api/profile
// @desc Test route
// @access Public
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);
        if(!profile) {
            res.status(400).json({errors: [{msg: 'Profile doesnt exist'}]});
            res.status(200).json({profile});
        }
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/', [
    auth,
    check('status', 'Status is required')
    .not()
    .isEmpty(),
    check('skills', 'Skills is required')
    .not()
    .isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
    } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    if(location) profileFields.location = location;
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    try {
        console.log("hello");
        let profile = await Profile.findOne({user: req.user.id});
        if(profile) {
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true});
            return res.json(profile);
        }
        profile = new Profile(profileFields);
        await profile.save();
        res.status(200).json({profile});
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})

// router.get('/', async (req, res) => {
//     try {
//         const profiles = await Profile.find().populate('user', ['name', 'avatar']);
//         res.status(200).json(profiles);
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).json('Server error');
//     }
// })

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
        if(!profile) {
            res.status(400).json({msg: 'Profile not found'});
        }
        res.status(200).json({profile});
    } catch (err) {
        console.log(err.message);
        if(err.king == 'ObjectId') {
            res.status(400).json({msg: 'Profile does not exist'});
        }
        res.status(500).json('Server error');
    }
})

router.delete('/', auth, async (req, res) => {
    try {
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findOneAndRemove({_id: req.user.id});
        res.status(200).json({msg: 'Deleted'});
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})
router.put('/', [auth, [
    check('title', 'Title is required')
    .not()
    .isEmpty(),
    check('company', 'Company is required')
    .not()
    .isEmpty(),
    check('from', 'From date is required')
    .not()
    .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };
    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.status(200).json({profile});
        
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        const deleteIndex = profile.experience
        .map(exp => exp.id)
        .indexOf(req.params.exp_id);
        profile.experience.splice(deleteIndex, 1);
        await profile.save();
        res.status(200).json({msg: 'Experience Deleted'});
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
        
    }
})
router.put('/education', [auth, [
    check('school', 'School name is required')
    .not()
    .isEmpty(),
    check('degree', 'Degree is required')
    .not()
    .isEmpty(),
    check('fieldofstudy', 'Field of study is required')
    .not()
    .isEmpty(),
    check('from', 'From date is required')
    .not()
    .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;
    const newEducation = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };
    try {
        const profile = await Profile.findOne({user: req.user.id});
        profile.education.unshift(newEducation);
        await profile.save();
        res.status(200).json({profile});
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.status(200).json({msg: 'Profile education deleted'});
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})
router.get('/github/:username', (req, res) => {
    try {
        console.log('hello');
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&
            client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        };
        request(options, (error, res1, body) => {
            if(error) console.error(error);
            if(res1.statusCode !== 200) {
                return res.status(404).json({msg: 'No github Profile found'});
            }
            res.status(200).json(JSON.parse(body)); 
        })
    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
})
module.exports = router;
