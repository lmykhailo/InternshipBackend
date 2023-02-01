const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var { doneprojects } = require('../models/doneprojects.js')

router.get('/', (req, res) => {
    doneprojects.find((err, data) => { err ? console.log(err) : res.send(data) }).sort({ createdAt: -1 });
});
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ` + req.params.id);
    doneprojects.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Retriving Done Projects :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.post('/', (req, res) => {
    var prj = new doneprojects({
        position: req.body.name,
        description: req.body.description,
        startdate: req.body.startdate,
        enddate: req.body.startdate
    });
    prj.save((err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Done Projects Save :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ` + req.params.id);
    var prj = {
        position: req.body.name,
        description: req.body.description,
        startdate: req.body.startdate,
        enddate: req.body.startdate
    };
    doneprojects.findByIdAndUpdate(req.params.id, { $set: prj }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Done Projects Update :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ` + req.params.id);

    doneprojects.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Done Projects Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});
module.exports = router;