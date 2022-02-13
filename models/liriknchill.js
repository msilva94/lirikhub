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

// Lirik and Chill Schema
const LiriknchillSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: new Date().setHours(17,0,0,0)
    },
    vods: [VodSchema]
});

const Liriknchill = module.exports = mongoose.model('Liriknchill', LiriknchillSchema);

module.exports.getAllLiriknchill = function(callback) {
    const projection = {number: 1, date: 1}
    const sort = {date: -1}
    Liriknchill.find({}, projection, callback).sort(sort);
}

module.exports.getLiriknchillByNumber = function(number, callback) {
    const query = {number: number}
    Liriknchill.findOne(query, callback);
}

module.exports.addLiriknchill = function(newLiriknchill, callback) {
    newLiriknchill.save(callback);
}

module.exports.updateLiriknchillByNumber = function(number, liriknchill, callback) {
    const query = {number: number}
    Liriknchill.findOneAndUpdate(query, liriknchill, callback);
}

module.exports.deleteLiriknchillByNumber = function(number, callback) {
    const query = {number: number}
    Liriknchill.deleteOne(query, callback);
}