const db = require("../models");

module.exports = {
    findAll: function (req, res) {
        db.Room.find(req.query)
            .sort({ roomNumber: 1 })
            .populate({
                path: 'participants'
            })
            .exec(function (err, dbModel) {
                if (!err) {
                    // This line wasn't there
                    res.json(dbModel)
                } else {
                    res.status(422).json(err)
                }
            });
    },
    findById: function (req, res) {
        db.Room.findById(req.params.id)
            .populate({
                path: 'participants'
            })
            .exec(function (err, dbModel) {
                if (!err) {
                    res.json(dbModel)
                } else {
                    res.status(422).json(err)
                }
            });
    },
    create: function (req, res) {
        db.Room.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Room.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Room.findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
