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
                type: Schema.Types.ObjectId,
                ref: 'experience'
            }
        ],
        education: [
            {
                type: Schema.Types.ObjectId,
                ref: 'education'
            }
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
