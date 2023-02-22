const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    company: {
        type: String,
        required: [true, 'Please provide a company name'],
        trim: true,
        maxlength: [50, 'company name cannot exceed 50 characters']
    },
    position: {
        type: String,
        required: [true, 'Please provide a position'],
        trim: true,
        maxlength: [50, 'position cannot exceed 50 characters']
    },
    status: {
        type: String,
        enum: ['pending', 'interview', 'rejected'],
        default: 'pending'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);