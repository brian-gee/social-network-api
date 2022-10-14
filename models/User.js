const { Schema, model } = require('mongoose');
const validator = require('validator');
const { validate } = require('./Thought');

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
            validate:{
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email',
                isAsync: false
            }
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
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;