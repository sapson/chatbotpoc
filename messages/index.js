"use strict";
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");

var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector);

//LUIS recognizer that points at our model 
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/5b1066af-61fe-4e69-9a21-a65de3bae211?subscription-key=96a2dfeb33e0482b884e2625b49ce68f&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

bot.dialog('/', dialog);

//Dialog intent handlers
dialog.matches('RaiseIncident', function (session, args, next) {
    var application = args.entities;
    //var entity = builder.EntityRecognizer.findEntity(args.entities, 'Application');
    //session.send('OK, creating an incident on %s', JSON.stringify(application));
    session.send('OK, creating an incident on %s', application[0].entity);
    
}).matches('None', function (session, args, next) {
    session.send('Sorry, I\'m not yet smart enough to understand that');
})

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}
