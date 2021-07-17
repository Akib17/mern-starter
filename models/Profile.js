const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user"
        },
        company: String,
        website: String,
        location: String,
        status: {
            type: String,
            required: true,
        },
        skills: {
            type: [String],
            required: true,
        },
        bio: String,
        githubusername: String,
        experience: [
            {
                title: {
                    type: String,
                    required: true,
                },
                company: {
                    type: String,
                    required: true,
                },
                location: String,
                from: {
                    type: Date,
                    required: true,
                },
                to: {
                    type: Date,
                },
                current: {
                    type: Boolean,
                    default: false,
                },
                description: String,
            },
        ],
        education: [
            {
                school: {
                    type: String,
                    required: true,
                },
                degree: {
                    type: String,
                    required: true,
                },
                fieldofstudy: {
                    type: String,
                    required: true,
                },
                from: {
                    type: Date,
                    required: true,
                },
                to: {
                    type: Date,
                },
                current: {
                    type: Boolean,
                    default: false,
                },
                description: String,
            },
        ],
        social: {
            youtube: String,
            twitter: String,
            facebook: String,
            linkedin: String,
            instagram: String,
        },
    },
    {
        timestamps: true,
    }
);

const Profile = model("profile", ProfileSchema);

module.exports = Profile;
