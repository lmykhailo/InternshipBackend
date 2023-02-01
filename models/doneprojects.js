const mongoose = require('mongoose');

var doneprojects = mongoose.model('doneprojects', {
    position: { type: String },
    description: { type: String },
    startdate: { type: Date },
    enddate: { type: Date }
});

module.exports = { doneprojects: doneprojects };