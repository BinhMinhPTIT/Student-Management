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
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
          },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Student', StudentSchema);