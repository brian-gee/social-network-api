const { Thought } = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbSocialData => res.json(dbSocialData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbSocialData => res.json(dbSocialData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then(dbSocialData => res.json(dbSocialData))
            .catch(err => res.json(err))
    },

    updateThought({ paras, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true
        })
            .then(dbSocialData => {
                if(!dbSocialData) {
                    res.status(404).json({ message: 'No user found with this id.'});
                }
                res.json(dbSocialData);
            })
            .catch(err => res.json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbSocialData => res.json(dbSocialData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;