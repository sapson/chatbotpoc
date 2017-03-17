var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");

module.exports = function (bot) {
bot.dialog('/objectives', [
    function (session, args, next) {
       var username = session.userData.name;
       session.send('So %s you want to know more about the ChatBot stream objectives', username);
       session.sendTyping();
       session.endDialog('I found all of our experts on that subject...\n they should be with you in the meeting room');
    }
]);
}