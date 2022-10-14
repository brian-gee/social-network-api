const { Thought } = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
            .then(dbSocialData => res.json(dbSocialData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400).json(err);
            })
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId})
            .then(dbSocialData => res.json(dbSocialData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbSocialData => {
                if (!dbSocialData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
                }
                res.json(dbSocialData)
            })
            .catch(err => res.json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
            new: true,
            runValidators: true
        })
            .then(dbSocialData => {
                if(!dbSocialData) {
                    res.status(404).json({ message: 'No user found with this id'});
                }
                res.json(dbSocialData);
            })
            .catch(err => res.json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(dbSocialData => res.json(dbSocialData))
            .catch(err => res.json(err));
    },

    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
                { _id: params.userId },
                {$push: {reactions: body }},
                {new: true, runValidators: true})
            .then(dbSocialData => {
                if(!dbSocialData) {
                    res.status(404).json({ message: 'No thought found with this id'});
                    return;
                }
                res.json(dbSocialData);
            })
            .catch(err => res.json(err));
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            {$pull: {reactions: params.thoughtId}},
            {new: true})
            .then(dbSocialData => {
                if(!dbSocialData) {
                    res.status(404).json({ message: 'No thought found with this id'});
                    return;
                }
                res.json(dbSocialData);
            })
            .catch(err => res.json(err));
    }
}

module.exports = thoughtController;