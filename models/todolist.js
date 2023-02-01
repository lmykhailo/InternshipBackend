const mongoose = require('mongoose');

var todolist = mongoose.model('todolist', {
    name: { type: String },
    description: { type: String },
    duedate: { type: Date },
});

module.exports = { todolist: todolist };