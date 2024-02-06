// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Import controllers
const checkEmailController = require('./src/controllers/auth/checkEmailController');
const resetPasswordController = require('./src/controllers/auth/resetPasswordController');
const loginController = require('./src/controllers/auth/loginController');
const signupController = require('./src/controllers/auth/signupController');
const blogController = require('./src/controllers/auth/blogController');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

mongoose.connect('mongodb+srv://taj:taj@cluster0.wzantar.mongodb.net/Blogger', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Serve static files (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Check if the email exists in the SignUp collection
app.post('/api/checkEmail', checkEmailController);

// Additional route for handling password reset
app.post('/api/resetPassword', resetPasswordController);

// Login route
app.post('/api/login', loginController);

// Signup route
app.post('/api/signup', signupController);

// Correct the route for the blogController
app.post('/api/blog', blogController.createBlog);
app.get('/api/blog/:blogId', blogController.getBlogById);
app.get('/api/blogs', blogController.getAllBlogs);

app.get('/', (req, res) => {
  res.send('Hello, your server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
