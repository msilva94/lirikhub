const mongoose = require('mongoose'), Schema = mongoose.Schema;
const config = require('../config/database');

// VOD Schema
const VodSchema = mongoose.Schema({
    vodurl: {
        type: String
    },
    vodtime: {
        type: String
    }
},{ _id : false });

// Playthrough Schema
const PlaythroughSchema = mongoose.Schema({
    game: {
        type: Schema.Types.ObjectId, ref: 'Game'
    },
    vods: [VodSchema],
    rating: {
        type: Number,
        min: 0,
        max: 10
    },
    date: {
        type: Date,
        default: new Date().setHours(17,0,0,0)
    }
});

const Playthrough = module.exports = mongoose.model('Playthrough', PlaythroughSchema);

module.exports.getAllPlaythroughs = function(callback) {
    const projection = {game: 1, date: 1, rating: 1}
    const sort = {date: -1}
    Playthrough.find({}, projection, callback).populate({path:'game', select:'name'}).sort(sort);
}

module.exports.getPlaythrough = function(id, callback) {
    const query = {_id: id}
    Playthrough.findOne(query, callback).populate('game');
}

module.exports.addPlaythrough = function(newPlaythrough, callback) {
    newPlaythrough.save(callback);
}

module.exports.updatePlaythrough = function(id, playthrough, callback) {
    const query = {_id: id}
    Playthrough.findOneAndUpdate(query, playthrough, callback);
}

module.exports.deletePlaythrough = function(id, callback) {
    const query = {_id: id}
    Playthrough.deleteOne(query, callback);
}