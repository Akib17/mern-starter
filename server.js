require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoute = require("./routes/AuthRoute");
const profileRoute = require('./routes/ProfileRoute');
const postRoute = require('./routes/PostRoute');
const uploadRoute = require('./routes/UploadRoute');

const app = express();

// Database connection
connectDB();

app.get("/", (req, res) => {
    res.send("Hello world");
});

// Allow public directory to access static files
app.use(express.static("public"));
// Allow access to request.body using multipart form
app.use(express.urlencoded({ extended: false }));
// Allow access to request.body using body-parse inbuilt express
app.use(express.json());

// Define Routes
app.use("/api/auth", authRoute); // Auth
app.use('/api/profile', profileRoute); //Profile
app.use('/api/post', postRoute); // Post
app.use('/api/upload', uploadRoute); // Upload Image

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
