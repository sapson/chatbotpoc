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

//var consoleconnecter = new builder.ConsoleConnector().listen();

var bot = new builder.UniversalBot(connector);

//LUIS recognizer that points at our model 
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/5b1066af-61fe-4e69-9a21-a65de3bae211?subscription-key=96a2dfeb33e0482b884e2625b49ce68f&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var greeting = require('./app/recognizer/greeting');
var commands = require('./app/recognizer/commands');
var smiles = require('./app/recognizer/smiles');

const dialog = {
    welcome: require('./app/dialogs/welcome'),
    incident: require('./app/dialogs/incident'),
    information: require('./app/dialogs/information'),
    help: require('./app/dialogs/help')
};

var intents = new builder.IntentDialog({
    recognizers: [
        commands,
        greeting,
        smiles,
        recognizer], 
        intentThreshold: 0.2,
        recognizeOrder: builder.RecognizeOrder.series
});

intents.matches('Greeting', '/welcome');
intents.matches('Reset', '/reset');
intents.matches('Smile', '/smileBack');
intents.matches('GetInformation', '/information');
intents.matches('RaiseIncident', '/incident');
intents.matches('RequestHelp', '/help');
intents.matches('Profile', '/profile');
intents.onDefault('/confused');

bot.dialog('/', intents);
dialog.welcome(bot);
dialog.information(bot);
dialog.incident(bot);
dialog.help(bot);

bot.dialog('/confused', [
    function (session, args, next) {
        session.endDialog('Sorry, I didn\'t understand you or maybe just lost track of our conversation %s', args);
        // ToDo: need to offer an option to say "help"
    }
]);

bot.dialog('/reset', [
    function (session, args, next) {
        session.endConversation(['See you later!', 'bye!']);
    }
]);

bot.dialog('/profile',  [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
    }
]);

bot.dialog('/smileBack', [
    function (session, args, next) {
        const smile = builder.EntityRecognizer.findEntity(args.entities, 'Smile');
        const type = builder.EntityRecognizer.findEntity(args.entities, 'Type');

        if (!smile || !smile.entity) {
            session.endDialog('<ss type="smile">:)</ss>');
        } else {
            session.endDialog(`<ss type="${type.entity}">${smile.entity}</ss>`);
        }
    }
]);

/*

//Begin dialog
intents.onBegin(function (session, args, next) {
    if (!session.userData.name) {
        session.beginDialog('/profile');
    } else {
        next();
    }
})

//Dialog intent handlers
intents.matches(/^change name/i, [
    function (session) {
        session.beginDialog('/profile');
    },
    function (session, results) {
        session.send('Ok... Changed your name to %s', session.userData.name);
    }
]);

intents.matches('RaiseIncident', function (session, args, next) {
    var application = args.entities;
    //var entity = builder.EntityRecognizer.findEntity(args.entities, 'Application');
    //session.send('OK, creating an incident on %s', JSON.stringify(application));
    session.send('OK, creating an incident on %s', application[0].entity);
}).matches('GetInformation', function (session, args, next) {
    var application = args.entities;
    session.send('You want some information on %s, please have a look at %s', application[0].entity,'https://gemhelp.azurewebsites.net');
}).matches('RequestHelp', function (session, args, next) {
    var application = args.entities;
    session.send('OK, help is on the way');
})

intents.onDefault('/confused');

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);

*/

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function () {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());
} else {
    module.exports = {
        default: connector.listen()
    }
}