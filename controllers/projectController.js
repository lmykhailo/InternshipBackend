const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { project } = require('../models/project.js')

router.get('/', (req, res) => {
    project.find((err, data) => { err ? console.log(err) : res.send(data) }).sort({ createdAt: -1 });
});
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ` + req.params.id);
    project.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Retriving Project :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.post('/', (req, res) => {
    var prj = new project({
        id: req.body.id,
        name: req.body.name,
        billable: req.body.billable,
        assignedpeople: req.body.assignedpeople,
        description: req.body.description,
        startdate: req.body.startdate,
        budget: req.body.budget
    });
    prj.save((err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Project Save :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ` + req.params.id);
    var prj = {
        id: req.body.id,
        name: req.body.name,
        billable: req.body.billable,
        assignedpeople: req.body.assignedpeople,
        description: req.body.description,
        startdate: req.body.startdate,
        budget: req.body.budget
    };
    project.findByIdAndUpdate(req.params.id, { $set: prj }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Project Update :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ` + req.params.id);

    project.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Project Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});
module.exports = router;