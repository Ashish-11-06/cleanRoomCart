const express = require('express');
const multer = require('multer'); // For file upload handling
const path = require('path');
const { addCategory, getCategories, getCategoryById, deleteCategory, updatedCategory } = require('../controllers/categoryController');

const router = express.Router();

// Set up multer storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/uploads/')); // Ensures correct path
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});
const upload = multer({ storage });

// Route to add a category (with file upload handling)
router.post('/add', upload.single('image'), async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const imagePath = `../uploads/${req.file.filename}`; // Store relative path
        req.body.image = imagePath; // Attach image path to request body

        await addCategory(req, res); // Call existing function with modified request
    } catch (error) {
        res.status(500).json({ error: 'Error uploading category' });
    }
});

// Route to get all categories
router.get('/get', getCategories);

router.get('/:id', getCategoryById);

// Delete category by id
router.delete('/delete/:id', deleteCategory);

router.put('/update/:id', updatedCategory);

module.exports = router;