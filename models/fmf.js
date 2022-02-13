const mongoose = require('mongoose'), Schema = mongoose.Schema;
const config = require('../config/database');

// Opponents Schema
const Opponents = mongoose.Schema({
    name: {
        type: String
    },
    vodurl: {
        type: String
    },
    vodtime: {
        type: String
    }
},{ _id : false });

// Games Schema
const Games = mongoose.Schema({
    game: {
        type: Schema.Types.ObjectId, ref: 'Game'
    },
    opponents: {
        type: [Opponents],
        required: true
    }
},{ _id : false });

// Fight me Friday Schema
const FmfSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: new Date().setHours(17,0,0,0)
    },
    vodurl: {
        type: String
    },
    games: {
        type: [Games],
        required: true
    }
});

const Fmf = module.exports = mongoose.model('Fmf', FmfSchema);

module.exports.getAllFmfs = function(callback) {
    const projection = {number: 1, "games.game": 1, "games.opponents.name": 1, date: 1}
    const sort = {number: -1}
    Fmf.find({}, projection, callback).populate('games.game', 'name').sort({number: -1});
}

module.exports.getFmfByNumber = function(number, callback) {
    const query = {number: number}
    Fmf.findOne(query, callback).populate('games.game');
}

module.exports.addFmf = function(newFmf, callback) {
    newFmf.save(callback);
}

module.exports.updateFmfByNumber = function(number, fmf, callback) {
    const query = {number: number}
    Fmf.findOneAndUpdate(query, fmf, callback);
}

module.exports.deleteFmfByNumber = function(number, callback) {
    const query = {number: number}
    Fmf.deleteOne(query, callback);
}