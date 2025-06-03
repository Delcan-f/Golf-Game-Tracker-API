const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
    holesPlayed: {
        type: Number,
        enum: [9,18],
        required: true
    },
    scores: {
        type: [Number],
        validate: {
            validator: function(scores) {
                return scores.length === this.holesPlayed;
            },
            message: 'Scores array length must match holes played'
        }
    },
    notes: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Game', gameSchema);