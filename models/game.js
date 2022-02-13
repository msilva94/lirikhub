const mongoose = require('mongoose');
const config = require('../config/database');

const GameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    buyurl: {
        type: String
    }
});

const Game = module.exports = mongoose.model('Game', GameSchema);

module.exports.getAllGames = function(callback) {
    const sort = {name: 1}
    Game.find(callback).sort(sort);
}

module.exports.getGame = function(id, callback) {
    const query = {_id: id}
    Game.findOne(query, callback);
}

module.exports.addGame = function(newGame, callback) {
    newGame.save(callback);
}

module.exports.updateGame = function(id, game, callback) {
    const query = {_id: id}
    Game.findOneAndUpdate(query, game, callback);
}

module.exports.deleteGame = function(id, callback) {
    const query = {_id: id}
    Game.deleteOne(query, callback);
}