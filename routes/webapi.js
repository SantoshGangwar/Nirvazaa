const express = require('express');
const router = express.Router();
const multer = require('../multer/multer'); // Import Multer instance
const Register = require('../models/Register'); // Import your Mongoose model
const User = require('../models/User')
const mongoose = require('../databaseconnection/database');
const upload = multer.single('image'); // Use .single() middleware for single file upload
const Categories = require('../models/Categories')
router.post('/api/register', upload, async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;
    const image = req.file.filename; // Multer renames the file and adds a timestamp

    const user = new Register({
      username,
      email,
      password,
      image,
      phoneNumber,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/api/register', async (req, res) => {
  try {
    const users = await Register.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/api/register/:id', async (req, res) => {
  try {
    const user = await Register.findByIdAndRemove(req.params.id);
    if (user) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/api/user', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
      // Duplicate key error, username is not unique
      res.status(400).json({ error: 'Username is already taken. Please choose a different username.' });
    } else {
      // Other validation or server error
      res.status(400).json({ error: error.message });
    }
  }
});


router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Delete a user by ID
router.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (user) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/// Categoris routes
router.get('/api/categories', async (req, res) => {
  try {
    const category= await Categories.find();
   
    res.json(category);
  } catch (error) {
    console.error('Error occurred while fetching categories', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;

