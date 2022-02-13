const express = require('express');
const router = express.Router();
const config = require('../config/twitch');
const request = require('request');
const apicache = require('apicache'), cache = apicache.middleware;

router.get('/', cache('30 seconds'), function(req, res, next) {
  const options = {
    headers: {
      'Client-ID': config.client_id
    }
  };

  request('https://api.twitch.tv/helix/streams?user_id=23161357', options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      var responses = data.data;

      if (responses.length != 0) {
        responses = responses[0];
        request('https://api.twitch.tv/helix/games?id=' + responses.game_id, options, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            responses.game = data.data[0].name;
            res.send(responses);
          } else {
            res.json({success: false, msg:'Stream not found'});
          }
        });
      } else {
        res.json({type: 'offline'});
      }
    } else {
      res.json({success: false, msg:'Stream not found'});
    }
  });
})

module.exports = router;