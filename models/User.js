const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            // validate: []
        },
        thoughts:[
            {
                type: Schema.Types.ObjectId,
                ref:'Thought'
            }
        ],
        friends:[ this ]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce(
        (total, friend) => total + friend.length + 1,
        0
    );
});

const User = model('User', UserSchema);

module.exports = User;