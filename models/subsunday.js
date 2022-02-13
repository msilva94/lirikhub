const mongoose = require('mongoose'), Schema = mongoose.Schema;
const config = require('../config/database');

// Games Schema
const Games = mongoose.Schema({
    game: {
        type: Schema.Types.ObjectId, ref: 'Game'
    },
    tought: {
        type: String
    },
    vodurl: {
        type: String
    },
    vodtime: {
        type: String
    }
},{ _id : false });

// Subsunday Schema
const SubsundaySchema = mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    votes: {
        type: String
    },
    date: {
        type: Date,
        default: new Date().setHours(17,0,0,0)
    },
    games: {
        type: [Games],
        required: true
    },
    vodurl: {
        type: String
    },
    message: {
        type: String
    }
});

const Subsunday = module.exports = mongoose.model('Subsunday', SubsundaySchema);

module.exports.getAllSubsundays = function(callback) {
    const projection = {number: 1, "games.game": 1, votes: 1, date: 1}
    const sort = {number: -1}
    Subsunday.find({}, projection, callback).populate('games.game', 'name').sort({number: -1});
}

module.exports.getSubsundayByNumber = function(number, callback) {
    const query = {number: number}
    Subsunday.findOne(query, callback).populate('games.game');
}

module.exports.addSubsunday = function(newSubsunday, callback) {
    newSubsunday.save(callback);
}

module.exports.updateSubsundayByNumber = function(number, subsunday, callback) {
    const query = {number: number}
    Subsunday.findOneAndUpdate(query, subsunday, callback);
}

module.exports.deleteSubsundayByNumber = function(number, callback) {
    const query = {number: number}
    Subsunday.deleteOne(query, callback);
}

/*
module.exports.getPlayedOn = function(number, callback) {
    const query = {number: parseInt(number)}
    Subsunday.aggregate([{"$unwind":"$games"},{"$group":{_id:"$games.game",number:{$push:"$number"}}},{$project:{_id:0,game:"$_id",number:1}},{$match:query}], callback);
}*/