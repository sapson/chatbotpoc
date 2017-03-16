const builder = require('botbuilder');

module.exports = function (bot) {
    bot.dialog('/GetInformation', [ function (session, args, next) {
          var application = args.entities;
          session.send('You want some information on %s, please have a look at %s', application[0].entity,'https://gemhelp.azurewebsites.net');
    }]);
}