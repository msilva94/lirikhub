const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Game = require('../models/game');

// Find All
router.get('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Game.getAllGames(function(err, games) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        res.json(games);
    });
})

// Find One
router.get('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.json({success: false, msg:'Invalid game id'});

    Game.getGame(req.params.id, function(err, game) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!game){
            return res.json({success: false, msg:'Game not found'});
        }

        res.json(game);
    });
})

// Add
router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    let newGame = new Game({
        name: req.body.name,
        image: req.body.image,
        buyurl: req.body.buyurl
    });

    Game.addGame(newGame, function(err, game) {
        if(err){
            res.json({success: false, msg:'Failed to add game'})
        } else {
            res.json({success: true, msg:'Added new game'})
        }
    });
})

// Update One
router.put('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.json({success: false, msg:'Invalid game id'});

    Game.updateGame(req.params.id, req.body, function(err, game) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!game){
            return res.json({success: false, msg:'Game not found'});
        }

        res.json({success: true, msg:'Game successfully updated'});
    });
})

// Delete One
router.delete('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    Game.deleteGame(req.params.id, function(err, game) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        res.json({success: true, msg:'Game successfully deleted'});
    });
})

module.exports = router;