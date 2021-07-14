const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Connected to MongoDB!');
    } catch (err) {
        // if can't connect
        console.log(err.message);
        // Exit with failure code
        process.exit(1);
    }
};

module.exports = connectDB