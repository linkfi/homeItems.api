
const { findById } = require('../models/item.model');
const Item = require('../models/item.model');

exports.create = (req, res) => {

    if (!req.body.name) {
        return res.status(400).send({

            message: "Name of item can not be empty"

        });
    }

    let count = req.body.count || 1;

    const item = new Item({
        name: req.body.name,
        count: count,
        manufacturer: req.body.manufacturer
    })

    item.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while add Item"
            })
        });

};

exports.findAll = (req, res) => {
    Item.find()
        .then(items => {
            res.send(items)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occured in getting all the Items"
            })
        })
};

exports.findOne = (req, res) => {
    Item.findById(req.params.itemId)
        .then(item => {
            if (!item) {
                return res.status(400).send({ message: `Item not found with id ${req.params.itemId}` });
            }
            res.send(item);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(400).send({ message: `Item not found with id ${req.params.itemId}` });
            }

            return res.status(500).send({
                message: `Error fetching item with id ${req.params.itemId}`
            })

        })
};

exports.update = (req, res) => {

    if (!req.body.name) {
        return res.status(400).send({

            message: "Name of item can not be empty"

        });
    }

    Item.findByIdAndUpdate(req.params.itemId, {
        name: req.body.name,
        count: req.body.count,
        manufacturer: req.body.manufacturer
    }, { new: true })
        .then(item => {

            if (!item) {
                return res.status(400).send({ message: `Item not found with id ${req.params.itemId}` });
            }
            res.send(item);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(400).send({ message: `Item not found with id ${req.params.itemId}` });
            }

            return res.status(500).send({
                message: `Error fetching item with id ${req.params.itemId}`
            })

        })


};

exports.delete = (req, res) => {

    Item.findByIdAndRemove(req.params.itemId)
        .then(item => {
            if (!item) {
                return res.status(404).send({ message: `Item not found with id ${req.params.itemId}` });
            }
            res.send({ message: "Item deleted successfully" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({ message: `Item not found with id ${req.params.itemId}` });
            }

            return res.status(500).send({ message: `Could not delete item with id ${req.params.itemId}` });
        })
};