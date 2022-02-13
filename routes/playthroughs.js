const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Playthrough = require('../models/playthrough');

// Find All
router.get('/', function(req, res, next) {
    Playthrough.getAllPlaythroughs(function(err, playthroughs) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        res.json(playthroughs);
    });
})

// Find One
router.get('/:id', function(req, res, next) {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.json({success: false, msg:'Invalid playthrough id'});

    Playthrough.getPlaythrough(req.params.id, function(err, playthrough) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!playthrough){
            return res.json({success: false, msg:'Playthrough not found'});
        }

        res.json(playthrough);
    });
})

// Add
router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    if(!mongoose.Types.ObjectId.isValid(req.body.game)) return res.json({success: false, msg:'Invalid game id'});

    let newPlaythrough = new Playthrough({
        game: mongoose.Types.ObjectId(req.body.game),
        vods: req.body.vods,
        rating: req.body.rating,
        date: req.body.date
    });

    Playthrough.addPlaythrough(newPlaythrough, function(err, playthrough) {
        if(err){
            res.json({success: false, msg:'Failed to add playthrough'})
        } else {
            res.json({success: true, msg:'Added new playthrough'})
        }
    });
})

// Update One
router.put('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.json({success: false, msg:'Invalid playthrough id'});

    Playthrough.updatePlaythrough(req.params.id, req.body, function(err, playthrough) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!playthrough) {
            return res.json({success: false, msg:'Playthrough not found'});
        }

        res.json({success: true, msg:'Playthrough updated'});
    });
})

// Delete One
router.delete('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.json({success: false, msg:'Invalid playthrough id'});

    Playthrough.deletePlaythrough(req.params.id, function(err, game) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        res.json({success: true, msg:'Playthrough successfully deleted'});
    });
})

module.exports = router;