var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");

module.exports = function (bot) {
bot.dialog('/incident', [
    function (session, args, next) {
        console.log(args, session);
        if (args) {
            var application = args.entities[0].entity || 'unknown';
            session.endDialog('I will create an incident ticket for you on %s', application);
        }
    }
]);
}