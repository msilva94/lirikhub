const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Fmf = require('../models/fmf');

// Add
router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    var newGames = req.body.games;
    for(let i=0; i<newGames.length; i++) {
        newGames[i].game = mongoose.Types.ObjectId(newGames[i].game);
    }

    let newFmf = new Fmf({
        number: req.body.number,
        date: req.body.date,
        vodurl: req.body.vodurl,
        games: newGames
    });
    
    Fmf.addFmf(newFmf, function(err, fmf) {
        if(err){
            res.json({success: false, msg:'Failed to add fight me friday'});
        } else {
            res.json({success: true, msg:'Added new fight me friday'});
        }
    });
})

// Find All
router.get('/', function(req, res, next) {
    Fmf.getAllFmfs(function(err, fmf) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        res.json(fmf);
    });
})

// Find One
router.get('/:number', function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid fight me friday number'});

    Fmf.getFmfByNumber(req.params.number, function(err, fmf) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!fmf) {
            return res.json({success: false, msg:'Fight me friday not found'});
        }

        res.json(fmf);
    });
})

// Update One
router.put('/:number', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid fight me friday number'});

    Fmf.updateFmfByNumber(req.params.number, req.body, function(err, fmf) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!fmf) {
            return res.json({success: false, msg:'Fight me friday not found'});
        }

        res.json({success: true, msg:'Fight me friday updated'});
    });
})

// Delete One
router.delete('/:number', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid fight me friday number'});

    Fmf.deleteFmfByNumber(req.params.number, function(err, fmf) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        res.json({success: true, msg:'Fight me friday deleted'});
    });
})

module.exports = router;