const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const adminRoutes = require('./routes/adminRoutes');
const consumerRoutes = require('./routes/consumerRoutes');
const categoryRoutes = require('./routes/categoryRoutes2');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');
const cartRoutes = require('./routes/cartRoutes');
const interestedUsersRoutes = require('./routes/interestedUsersRoutes');
const contactRoutes = require('./routes/contactRoutes');
const subProductRoutes = require('./routes/subProductRoutes'); // 🔥 Add this line

const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Serve static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log("Serving uploads from:", path.join(__dirname, "uploads"));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/consumer', consumerRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subCategoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/interested-users", interestedUsersRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/subproduct', subProductRoutes); // 🔥 Register Subproduct Routes

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));