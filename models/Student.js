const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
        gpa: {
            type: Number,
            required: [true, 'Please provide a gpa'],
            maxlength: 4,
        },
        hometown: {
            type: String,
            required: [true, 'Please provide hometown'],
            maxlength: 20,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
          },
    },
    { timestamps: true }
)

StudentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Student', StudentSchema);