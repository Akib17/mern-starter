const { validationResult } = require("express-validator");
const Post = require("../models/Post");
const User = require("../models/User");

/**
 * @desc add new post
 * @Route api/post
 * @method POST
 * @access private
 */
exports.addPost = async (req, res) => {
    const { title, body, thumbnail } = req.body;
    const errors = validationResult(req).formatWith(err => err.msg);
    if (!errors.isEmpty()) {
        res.status(400).json({
            error: errors.mapped()
        });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = new Post({
            title,
            body,
            thumbnail,
            user: user.id
        });

        const newPost = await post.save();
        res.status(200).json(newPost);

    } catch (err) {
        console.log(err.messages);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
};


/**
 * @desc get all post
 * @Route /api/post
 * @method GET
 * @access private
*/
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt');
        res.status(200).json(posts);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
};

/**
 * @desc Get single post
 * @Route /api/post/:postId
 * @method GET
 * @access public
 */
exports.getSinglePost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                msg: 'No post found'
            });
        }

        res.status(200).json(post);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
};


/**
 * @desc Delete single post
 * @Route /api/post/postId
 * @method DELETE
 * @access private
 */
exports.deleteSinglePost = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                msg: 'Post not found'
            });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'User not authorized to remove this post'
            });
        }

        await post.remove();

        res.status(200).json({
            msg: 'Post removed successfully'
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
};

/**
 * @desc Post Like & Dislike
 * @Route api/post/like/:id
 * @method PUT
 * @access private
 */
exports.likePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                msg: 'No post found'
            });
        }

        if (post.likes.find(like => like.user.toString() === req.user.id)) {
            return res.status(400).json({
                msg: 'Post already liked'
            });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();
        res.status(200).json(post);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
};


/**
 * @desc Comment for post
 * @Route api/post/comment/:id
 * @method POST
 * @access private
 */
exports.postComment = async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;

    try {
        const post = await Post.findById(id);
        const user = await User.findById(req.user.id).select('-password');
        if (!post) {
            return res.status(404).json({
                msg: 'Sorry, post not found'
            });
        }

        const comment = {
            user: req.user.id,
            body,
            name: user.name,
        };

        post.comments.unshift(comment);

        await post.save();

        res.status(200).json(post);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
};


/**
 * @Desc Delete comment
 * @Route api/post/comment/:id/:commentId
 * @Method DELETE
 * @access private
 */
exports.deleteComment = async (req, res) => {
    const { commentId, id } = req.params;
    try {
        const post = await Post.findById(id);

        const comment = post.comments.find(comment => comment.id === commentId);

        if (!comment) {
            return res.status(404).json({
                msg: 'No comment found'
            });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'Unauthorized user'
            });
        }

        comment.remove();

        await post.save();

        res.status(200).json(post);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: 'Internal server error'
        });
    }
};