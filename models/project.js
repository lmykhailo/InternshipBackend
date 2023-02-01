const mongoose = require('mongoose');

var project = mongoose.model('project', {
    id: { type: Number },
    name: { type: String },
    billable: { type: Boolean },
    assignedpeople: { type: String },
    description: { type: String },
    startdate: { type: Date },
    budget: { type: String }
});

module.exports = { project: project };