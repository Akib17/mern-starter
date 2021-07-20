const { addPost, getAllPosts, getSinglePost, deleteSinglePost, likePost } = require('../controller/PostController');
const auth = require('../middleware/auth');
const PostValidator = require('../validator/PostValidator');

const router = require('express').Router()

router.post('/', PostValidator, auth, addPost); //Add new post
router.get('/', auth, getAllPosts); // Get all Posts
router.get('/:postId', getSinglePost); // Get single Post
router.delete('/:postId', auth, deleteSinglePost); // Delete single Post
router.put('/like/:id', auth, likePost) // Like post

module.exports = router