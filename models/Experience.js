const { model, Schema } = require("mongoose");

const expSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    from: {
        type: Date,
        required: true,
    },
    current: {
        type: Boolean,
        default: false
    },
    to: {
        type: Date
    },
    description: String,
});

const Experience = model('experience', expSchema);

module.exports = Experience;
