const Consumer = require('../models/Consumer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Consumer
exports.registerConsumer = async (req, res) => {
  try {
    console.log("Received Data:", req.body); // ✅ Add this line to check incoming data
    const { firstName, lastName, email, password } = req.body;

    // ✅ Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const existingUser = await Consumer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newConsumer = new Consumer({ 
      firstName, 
      lastName, 
      email, 
      password: hashedPassword });

    await newConsumer.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login Consumer
exports.loginConsumer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate required fields (firstName and lastName not needed for login)
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const consumer = await Consumer.findOne({ email });
    if (!consumer) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, consumer.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: consumer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, message: 'Consume Login successfully' });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
