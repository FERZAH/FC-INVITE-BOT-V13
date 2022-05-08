const mongoose = require('mongoose');

const invite = new mongoose.Schema({
    guildID: String,
    userID: String,
    Regular: Number,
    Fake: Number,
    Left: Number,
    Bonus: Number,
    leftedMembers: { type: Array, default: [] }
});

module.exports = mongoose.model('invite', invite)