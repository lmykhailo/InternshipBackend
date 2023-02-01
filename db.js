const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ProjectDB', (err) => err ? console.log(err) : console.log('DB connected successfully'));

module.exports = mongoose;