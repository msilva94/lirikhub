const express = require('express');
const router = express.Router();
const request = require('request');
const apicache = require('apicache'), cache = apicache.middleware;

router.get('/', cache('1 hour'), function(req, res, next) {
    const options = {
        url: 'https://badges.twitch.tv/v1/badges/channels/23161357/display?language=en',
    };

    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            res.send(data);
        } else {
            res.json({success: false, msg:'Badges not found'});
        }
    });
})

module.exports = router;