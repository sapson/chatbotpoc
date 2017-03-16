const builder = require('botbuilder');

module.exports = function (bot) {
    bot.dialog('/RaiseIncident', [ function (session, args, next) {
          var application = args.entities;
          session.send('OK, creating an incident on %s', application[0].entity);
    }]);
}