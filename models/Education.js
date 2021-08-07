const { model, Schema } = require('mongoose');

const eduSchema = new Schema({
    school: {
        type: String,
    },
    degree: {
        type: String,
    },
    fieldofstudy: {
        type: String,
    },
    from: {
        type: Date,
    },
    to: {
        type: Date,
    },
    current: {
        type: Boolean,
        default: false,
    },
    description: String,
});

const Education = model('education', eduSchema);

module.exports = Education;