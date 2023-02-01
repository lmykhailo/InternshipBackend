const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db.js');
const app = express();
const PORT = 5000;
var projectController = require('./controllers/projectController.js');
var todoController = require('./controllers/todoController.js');
var doneprojectsController = require('./controllers/doneprojectsController.js');
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next();
})
app.listen(PORT, (err) => { err ? console.log(err) : console.log('Listening on port ' + PORT) });

app.use('/projects', projectController);
app.use('/todolist', todoController);
app.use('/doneprojects', doneprojectsController);