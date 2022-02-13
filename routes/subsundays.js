const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Subsunday = require('../models/subsunday');

// Add
router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    var newGames = req.body.games;
    for(let i=0; i<newGames.length; i++) {
        newGames[i].game = mongoose.Types.ObjectId(newGames[i].game);
    }

    let newSubsunday = new Subsunday({
        number: req.body.number,
        votes: req.body.votes,
        date: req.body.date,
        games: newGames,
        vodurl: req.body.vodurl,
        message: req.body.message
    });
    
    Subsunday.addSubsunday(newSubsunday, function(err, subsunday) {
        if(err){
            res.json({success: false, msg:'Failed to add subsunday'});
        } else {
            res.json({success: true, msg:'Added new subsunday'});
        }
    });
})

// Find All
router.get('/', function(req, res, next) {
    Subsunday.getAllSubsundays(function(err, subsunday) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        res.json(subsunday);
    });
})

// Played On
/*router.get('/:number/playedon', function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid subsunday number'});

    Subsunday.getPlayedOn(req.params.number, function(err, subsunday) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!subsunday) {
            return res.json({success: false, msg:'Subsunday not found'});
        }
        
        res.json(subsunday);
    });
})*/

// Find One
router.get('/:number', function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid subsunday number'});

    Subsunday.getSubsundayByNumber(req.params.number, function(err, subsunday) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!subsunday) {
            return res.json({success: false, msg:'Subsunday not found'});
        }

        res.json(subsunday);
    });
})

// Update One
router.put('/:number', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid subsunday number'});

    Subsunday.updateSubsundayByNumber(req.params.number, req.body, function(err, subsunday) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!subsunday) {
            return res.json({success: false, msg:'Subsunday not found'});
        }

        res.json({success: true, msg:'Subsunday updated'});
    });
})

// Delete One
router.delete('/:number', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid subsunday number'});

    Subsunday.deleteSubsundayByNumber(req.params.number, function(err, subsunday) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        res.json({success: true, msg:'Subsunday deleted'});
    });
})

module.exports = router;