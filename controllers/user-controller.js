const { User } = require('../models');

const userController = {
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
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

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbSocialData => res.json(dbSocialData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbSocialData => res.json(dbSocialData))
            .catch(err => res.json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
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

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbSocialData => res.json(dbSocialData))
            .catch(err => res.json(err));
    },

    addFriend({params, body}, res) {
        User.findOneAndUpdate(
                { _id: params.userId },
                {$push: {friends: params.friendId}},
                {new: true, runValidators: true})
            .then(dbSocialData => {
                if(!dbSocialData) {
                    res.status(404).json({ message: 'No user found with this id'});
                    return;
                }
                res.json(dbSocialData);
            })
            .catch(err => res.json(err));
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            {$push: {friends: params.friendId}},
            {new: true})
            .then(dbSocialData => res.json(dbSocialData))
            .catch(err => res.json(err))
    }
};

module.exports = userController;