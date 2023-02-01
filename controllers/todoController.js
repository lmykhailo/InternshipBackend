const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { todolist } = require('../models/todolist.js')

router.get('/', (req, res) => {
    todolist.find((err, data) => { err ? console.log(err) : res.send(data) }).sort({ createdAt: -1 });
});
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ` + req.params.id);
    todolist.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Retriving Todo :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.post('/', (req, res) => {
    var prj = new todolist({
        name: req.body.name,
        description: req.body.description,
        duedate: req.body.duedate
    });
    prj.save((err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Todo Save :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ` + req.params.id);
    var prj = {
        name: req.body.name,
        description: req.body.description,
        duedate: req.body.duedate
    };
    todolist.findByIdAndUpdate(req.params.id, { $set: prj }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Todo Update :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ` + req.params.id);

    todolist.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Todo Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});
module.exports = router;