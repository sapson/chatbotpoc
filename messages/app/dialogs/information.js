const builder = require('botbuilder');

module.exports = function (bot) {
    bot.dialog('/information', [ function (session, args, next) {
          console.log(args);
          if (args) {
            var application = args.entities[0].entity || 'unknown';
            session.endDialog('For more information on %s, please have a look at %s', application,'https://gemhelp.azurewebsites.net');
          }
    }]);
}