const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Battlestation = require('../models/battlestation');

// Find All
router.get('/', function(req, res, next) {
    Battlestation.getAllBattlestations(function(err, battlestations) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        res.json(battlestations);
    });
})

// Find One
router.get('/:number', function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid battlestations review number'});

    Battlestation.getBattlestationByNumber(req.params.number, function(err, battlestation) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!battlestation) {
            return res.json({success: false, msg:'Battlestations review not found'});
        }

        res.json(battlestation);
    });
})

// Add
router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    let newBattlestation = new Battlestation({
        number: req.body.number,
        date: req.body.date,
        vods: req.body.vods
    });

    Battlestation.addBattlestation(newBattlestation, function(err, battlestation) {
        if(err){
            res.json({success: false, msg:'Failed to add battlestations review'})
        } else {
            res.json({success: true, msg:'Added new battlestations review'})
        }
    });
})

// Update One
router.put('/:number', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid battlestations review number'});

    Battlestation.updateBattlestationByNumber(req.params.number, req.body, function(err, battlestation) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!battlestation) {
            return res.json({success: false, msg:'Battlestations review not found'});
        }

        res.json({success: true, msg:'Battlestations review updated'});
    });
})

// Delete One
router.delete('/:number', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid battlestations review number'});

    Battlestation.deleteBattlestationByNumber(req.params.number, function(err, battlestation) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        res.json({success: true, msg:'Battlestations review deleted'});
    });
})

module.exports = router;