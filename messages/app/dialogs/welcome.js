const builder = require('botbuilder');

module.exports = function(bot) {
    bot.dialog('/welcome', [
        function (session, args, next) {
            const lastVisit = session.userData.lastVisit;

            if (!lastVisit) {

                session.send('Welcome to the GEM IS Helpdesk support channel');

                session.userData = Object.assign({}, session.userData, {
                    lastVisit: new Date()
                });
                builder.Prompts.text(session, 'What\'s your name ?');
            } else {
                session.send('Glad you\'re back!');
                next();
            }
           
        },
        function(session, results) {
            if (results.response) {
                session.userData.name = results.response;
            } 
            session.endDialog('How can I help you %s?', session.userData.name || '' );
        }
    ]);
};