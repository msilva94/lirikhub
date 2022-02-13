const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Hotline = require('../models/hotline');

// Find All
router.get('/', function(req, res, next) {
    Hotline.getAllHotlines(function(err, hotlines) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        res.json(hotlines);
    });
})

// Find One
router.get('/:number', function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid sub hotline number'});

    Hotline.getHotlineByNumber(req.params.number, function(err, hotline) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!hotline) {
            return res.json({success: false, msg:'Sub hotline not found'});
        }

        res.json(hotline);
    });
})

// Add
router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    let newHotline = new Hotline({
        number: req.body.number,
        date: req.body.date,
        vods: req.body.vods
    });

    Hotline.addHotline(newHotline, function(err, hotline) {
        if(err){
            res.json({success: false, msg:'Failed to add sub hotline'})
        } else {
            res.json({success: true, msg:'Added new sub hotline'})
        }
    });
})

// Update One
router.put('/:number', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid sub hotline number'});

    Hotline.updateHotlineByNumber(req.params.number, req.body, function(err, hotline) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        if(!hotline) {
            return res.json({success: false, msg:'Sub hotline not found'});
        }

        res.json({success: true, msg:'Sub hotline updated'});
    });
})

// Delete One
router.delete('/:number', passport.authenticate('jwt', {session: false}), function(req, res, next) {
    if(isNaN(req.params.number)) return res.json({success: false, msg:'Invalid sub hotline number'});

    Hotline.deleteHotlineByNumber(req.params.number, function(err, hotline) {
        if(err){
            return res.json({success: false, msg:'An error ocurred'});
        }

        res.json({success: true, msg:'Sub hotline deleted'});
    });
})

module.exports = router;