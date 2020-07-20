const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');
const {check, validationResult} = require('express-validator');
router.post('/', [auth, [
    check('text', 'Text is required')
    .not()
    .isEmpty()   
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    try {
        const user = await User.findById(req.user.id).select('--password');
        const newPostData = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };
        const newPost = new Post(newPostData);
        await newPost.save();
        res.status(200).json({'post': newPost});
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.status(200).json(posts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
});
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post)
        return res.status(404).json({msg: "Post not found"});
        res.status(200).json(post);
    } catch (err) {
        console.log(err.message);
        if(err.kind == "ObjectId")
            return res.status(404).json({msg: "Post not found"});
        res.status(500).send('Server error');
    }
});
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        if(post.user.toString() !== req.user.id) {
            return req.status(401).json({ msg: "User not authorized" });
        }
        await post.remove();
        res.status(200).json({ msg: "Post deleted" });
    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId')
            return res.status(404).json({ msg: 'Post not found' });
        return res.status(500).send("Server error");
    }
})
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post  = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json( {msg: 'Post not found'} );
        }
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({msg: "Post already liked"});
        }
        post.likes.unshift({user: req.user.id});
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        console.log(err.message);
        if(err.kind === 'ObjectId') 
            return res.status(404).json({ msg: 'Post not found' });
        return res.status(500).send('Server error');
    }
})
// @route  POST /api/posts/unlike/id
// @desc   unlike a post
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({msg: 'Post not found'});
        }
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({msg: "Post not liked yet"});
        }
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        return res.status(200).json({msg: "Post has been unliked"});
    } catch (err) {
        console.log(err.message);
        if(err.kind === "ObjectId") {
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).send('Server error');
    }
});

//Add and delete comment
// @route  POST /api/posts/:id
// @desc   Add a comment
// @access Private
router.post('/comment/:id', [auth, [
    check('text', 'Text is required')
    .not()
    .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        const newComment = {
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,

        };
        post.comments.unshift(newComment);
        await post.save();
        res.status(200).json(post.comments);
    } catch (err) {
        console.log(err.message);
        if(err.kind === 'ObjectId')
            res.status(404).json({msg: 'Post not found'});
        res.status(500).send('Server error');
    }
})
//Delete Comment
// @route  DELETE /api/posts/comment/:id/:comment_id
// @desc   Delete comment
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        if(!comment) {
            res.status(404).json({msg: "Comment does not exist"});
        }
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "Unauthorized access"});
        }
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);
        await post.save();
        res.status(200).json({msg: "Comment deleted"});
    } catch (err) {
        console.log(err.message);
        res.status(500).json({msg: 'Serveer error'});
    }

});
module.exports = router;