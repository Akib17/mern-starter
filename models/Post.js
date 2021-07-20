const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    thumbnail: String,
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            body: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});

const Post = model('post', PostSchema);

module.exports = Post;