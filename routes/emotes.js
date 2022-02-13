const express = require('express');
const router = express.Router();
const request = require('request');
const apicache = require('apicache'), cache = apicache.middleware;

router.get('/', cache('1 hour'), function(req, res, next) {
  var responses = [];
  const url = 'https://api.twitchemotes.com/api/v4/channels/23161357';
  
  request(url, function(error, response, body) {
    if(!error && response.statusCode == 200) {
        const data = JSON.parse(body);

        responses.push(data.emotes.filter(item => item.emoticon_set == data.plans['$4.99']));
        responses.push(data.emotes.filter(item => item.emoticon_set == data.plans['$9.99']));
        responses.push(data.emotes.filter(item => item.emoticon_set == data.plans['$24.99']));
    } else {
        res.json({success: false, msg:'Emotes not found'});
    }

    responses.push(getOldEmotes());

    res.send(responses);
  });
})

var getOldEmotes = function() {
    var old_emotes = [];
    //old_emotes.push({id: 2197, code: 'lirikB'});
    old_emotes.push({id: 136681, code: 'lirikCLENCH'});
    //old_emotes.push({id: 23002, code: 'lirikCRASH'});
    old_emotes.push({id: 9706, code: 'lirikGOTY'});
    //old_emotes.push({id: 162308, code: 'lirikLEAN'});
    //old_emotes.push({id: 72445, code: 'lirikHOLD'});
    //old_emotes.push({id: 623359, code: 'lirikDEWD'});
    //old_emotes.push({id: 164087, code: 'lirikFAKE'});
    //old_emotes.push({id: 159912, code: 'lirikDED'});
    //old_emotes.push({id: 680659, code: 'lirikNOT'});
    old_emotes.push({id: 105098, code: 'lirikNON'});
    // old_emotes.push({id: 4493, code: 'lirikFAT'});
    // old_emotes.push({id: 149444, code: 'lirikOK'});
    // old_emotes.push({id: 85991, code: 'lirikCLAP'});
    // old_emotes.push({id: 65389, code: 'lirikGOOD'});
    // old_emotes.push({id: 81628, code: 'lirikTRUCK'});
    // old_emotes.push({id: 9914, code: 'lirikRIP'});
    old_emotes.push({id: 12640, code: 'lirikD'});
    old_emotes.push({id: 109208, code: 'lirikOG'});
    // old_emotes.push({id: 392662, code: 'lirikHey'});
    // old_emotes.push({id: 48740, code: 'lirikWc'});
    // old_emotes.push({id: 142912, code: 'lirikWUT'});
    old_emotes.push({id: 67162, code: 'lirikPISS'});
    old_emotes.push({id: 12127, code: 'lirikPVP'});
    old_emotes.push({id: 9420, code: 'lirikRage'});
    old_emotes.push({id: 29425, code: 'lirikCRY'});
    old_emotes.push({id: 17853, code: 'lirikDEAD'});
    old_emotes.push({id: 19993, code: 'lirikCOP'});
    old_emotes.push({id: 37626, code: 'lirikJ'});
    old_emotes.push({id: 19994, code: 'lirikDRUG'});
    old_emotes.push({id: 9419, code: 'lirikR'});
    old_emotes.push({id: 24742, code: 'lirikOWL'});
    old_emotes.push({id: 9418, code: 'lirikG'});
    old_emotes.push({id: 553, code: 'lirikSodA'});
    old_emotes.push({id: 2343, code: 'lirikFA'});
    // old_emotes.push({id: 45583, code: 'lirikMEOW'});
    // old_emotes.push({id: 2173, code: 'lirikM'});
    // old_emotes.push({id: 680579, code: 'lirikREKT'});
    // old_emotes.push({id: 680670, code: 'lirikMLG'});

    return old_emotes;
}

module.exports = router;