var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");

module.exports = function (bot) {
bot.dialog('/RaiseIncident', [
    function (session, args, next) {
        session.send('Incident');
    }
]);
}