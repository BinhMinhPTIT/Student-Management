const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please provide name'],
            maxlength: 50,
        },
        lastName: {
            type: String,
            required: [true, 'Please provide name'],
            maxlength: 50,
        },
        role: {
            type: String,
            required: [true, 'Please provide a role'],
            maxlength: 50,
        },
        lop: {
            type: String,
            required: [true, 'Please provide lop'],
            maxlength: 50,
        },
    },
)


module.exports = mongoose.model('Student', StudentSchema);