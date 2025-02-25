const Contact = require('../models/Contact');

// Add a new contact request
exports.addContact = async(req, res) => {
    try {
        const { fullName, phone, email, orderNumber, companyName, comments } = req.body;

        const contact = new Contact({
            fullName,
            phone,
            email,
            orderNumber,
            companyName,
            comments,
        });

        await contact.save();
        res.status(201).json({ message: 'Contact request submitted successfully', contact });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all contact requests
exports.getContacts = async(req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a contact request by ID
exports.getContactById = async(req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact request not found' });
        }
        res.json({ message: 'Contact request fetched successfully', contact });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a contact request
exports.deleteContact = async(req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact request not found' });
        }
        res.status(200).json({ message: 'Contact request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};