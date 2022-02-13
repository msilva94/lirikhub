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

// Battlestations Review Schema
const BattlestationSchema = mongoose.Schema({
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

const Battlestation = module.exports = mongoose.model('Battlestation', BattlestationSchema);

module.exports.getAllBattlestations = function(callback) {
    const projection = {number: 1, date: 1}
    const sort = {date: -1}
    Battlestation.find({}, projection, callback).sort(sort);
}

module.exports.getBattlestationByNumber = function(number, callback) {
    const query = {number: number}
    Battlestation.findOne(query, callback);
}

module.exports.addBattlestation = function(newBattlestation, callback) {
    newBattlestation.save(callback);
}

module.exports.updateBattlestationByNumber = function(number, battlestation, callback) {
    const query = {number: number}
    Battlestation.findOneAndUpdate(query, battlestation, callback);
}

module.exports.deleteBattlestationByNumber = function(number, callback) {
    const query = {number: number}
    Battlestation.deleteOne(query, callback);
}