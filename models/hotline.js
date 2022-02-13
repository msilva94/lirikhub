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

// Hotline Schema
const HotlineSchema = mongoose.Schema({
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

const Hotline = module.exports = mongoose.model('Hotline', HotlineSchema);

module.exports.getAllHotlines = function(callback) {
    const projection = {number: 1, date: 1}
    const sort = {date: -1}
    Hotline.find({}, projection, callback).sort(sort);
}

module.exports.getHotlineByNumber = function(number, callback) {
    const query = {number: number}
    Hotline.findOne(query, callback);
}

module.exports.addHotline = function(newHotline, callback) {
    newHotline.save(callback);
}

module.exports.updateHotlineByNumber = function(number, hotline, callback) {
    const query = {number: number}
    Hotline.findOneAndUpdate(query, hotline, callback);
}

module.exports.deleteHotlineByNumber = function(number, callback) {
    const query = {number: number}
    Hotline.deleteOne(query, callback);
}