const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const consumerRoutes = require('./routes/consumerRoutes');
const categoryRoutes = require('./routes/categoryRoutes2');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes'); // ✅ Import Contact Routes

const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/consumer', consumerRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subCategoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/contact', contactRoutes); // ✅ Add Contact Route

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));