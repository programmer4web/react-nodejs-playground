var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Department = require('../models/Department');

// CREATES A NEW DEPARTMENT
router.post('/', (req, res) => {
    Department.create({
            name : req.body.name,
            abbreviation: req.body.abbreviation,
            description: req.body.description
        },
        (err, department) => {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(department);
        });
});

// RETURNS ALL THE DEPARTMENTS IN THE DATABASE
router.get('/', (req, res) => {
    Department.find({}, (err, departments) => {
        if (err) return res.status(500).send("There was a problem finding the departments.");
        res.status(200).send(departments);
    });
});

// GETS A SINGLE DEPARTMENT FROM THE DATABASE
router.get('/:id', (req, res) => {
    Department.findById(req.params.id, (err, department) => {
        if (err) return res.status(500).send("There was a problem finding the department.");
        if (!department) return res.status(404).send("No department found.");
        res.status(200).send(department);
    });
});

// DELETES A DEPARTMENT FROM THE DATABASE
router.delete('/:id', (req, res) => {
    Department.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("Department: "+ user.name +" was deleted.");
    });
});

// UPDATES A SINGLE DEPARTMENT IN THE DATABASE
router.put('/:id', (req, res) => {
    Department.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


module.exports = router;
