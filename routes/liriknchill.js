const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Liriknchill = require('../models/liriknchill');

// Find All
router.get('/', function(req, res, next) {
  Liriknchill.getAllLiriknchill(function(err, liriknchill) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        res.json(liriknchill);
    });
})

// Find One
router.get('/:number', function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid lirik and chill number'});

    Liriknchill.getLiriknchillByNumber(req.params.number, function(err, liriknchill) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!liriknchill) {
            return res.json({success: false, msg:'Lirik and chill not found'});
        }

        res.json(liriknchill);
    });
})

// Add
router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    let newLiriknchill = new Liriknchill({
        number: req.body.number,
        date: req.body.date,
        vods: req.body.vods
    });

    Liriknchill.addLiriknchill(newLiriknchill, function(err, liriknchill) {
        if(err){
            res.json({success: false, msg:'Failed to add lirik and chill'})
        } else {
            res.json({success: true, msg:'Added new lirik and chill'})
        }
    });
})

// Update One
router.put('/:number', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid sub lirik and chill number'});

    Liriknchill.updateLiriknchillByNumber(req.params.number, req.body, function(err, liriknchill) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!liriknchill) {
            return res.json({success: false, msg:'Lirik and chill not found'});
        }

        res.json({success: true, msg:'Lirik and chill updated'});
    });
})

// Delete One
router.delete('/:number', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid lirik and chill number'});

    Liriknchill.deleteLiriknchillByNumber(req.params.number, function(err, liriknchill) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        res.json({success: true, msg:'Lirik and chill deleted'});
    });
})

module.exports = router;