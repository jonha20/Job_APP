const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['job', 'grant', 'event'],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: function() {
            return this.type === 'job';
        }
    },
    startDate: {
        type: Date,
        required: function() {
            return this.type === 'event';
        }
    },
    endDate: {
        type: Date,
        required: function() {
            return this.type === 'event';
        }
    },
    amount: {
        type: Number,
        required: function() {
            return this.type === 'grant';
        }
    },
    requirements: [{
        type: String
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'closed'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad; 