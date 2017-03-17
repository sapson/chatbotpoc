const builder = require('botbuilder');

module.exports = function(bot) {
    bot.dialog('/welcome', [
        function (session, args, next) {
            const lastVisit = session.userData.lastVisit;

            session.send(['Hello!', 'Hi there!', 'Hi!']);

            if (!lastVisit) {
                session.beginDialog('/profile');

                session.send('Welcome to the GEM IS Helpdesk support channel');

                session.userData = Object.assign({}, session.userData, {
                    lastVisit: new Date()
                });
                session.save();
            } else {
                session.send('Glad you\'re back!');
            }

            session.endDialog('How can I help you?');
        }
    ]);
};