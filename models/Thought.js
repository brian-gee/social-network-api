const { Schema, model } = require('mongoose');
const dateFormat = require ('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            maxLength: 280
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.reduce(
        (total, reaction) => total + reaction.length + 1,
        0
    );
})

const Thought = model('Thought', ThoughtSchema);

const ReactionSchema = new Schema(
    {
        reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
        },
        reactionBody : {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
)

const Reaction = model('Reaction', ReactionSchema);

module.exports = { Thought, Reaction};