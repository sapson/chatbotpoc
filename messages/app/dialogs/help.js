const builder = require('botbuilder');

module.exports = function (bot) {
    bot.dialog('/RequestHelp', [ function (session, args, next) {
          session.send('OK, help is on the way');
    }]);
}