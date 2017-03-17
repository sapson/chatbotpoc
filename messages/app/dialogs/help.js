const builder = require('botbuilder');

module.exports = function (bot) {
    bot.dialog('/help', [ function (session, args, next) {
          console.log(args);
          session.endDialog('Help is on the way');
    }]);
}