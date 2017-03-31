var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var request = require('request');
var config = require('../../config');

function getRemit(session) {
    var url = "https://api.gemservices.io/remit/beta/availability";
    request({
        headers:{
            'Accept':'text/html',
            'Content-Type':'application/json',
            'Ocp-Apim-Subscription-Key':config.remit_api
        },
        uri:url,
        method:'GET'
    }, function (err,res,body) {
        console.log(err);
       session.endDialog(body);
    });
}

module.exports = function (bot) {
bot.dialog('/remit', [
    function (session, args, next) {
        getRemit(session);
    }
]);
}