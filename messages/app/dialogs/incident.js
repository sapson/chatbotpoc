var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var snow = require('../api/snow');

module.exports = function (bot) {
bot.dialog('/incident', [
    function (session, args, next) {
        if (args) {
            var app = builder.EntityRecognizer.findEntity(args.entities, 'Application');
            //session.endDialog('I will create an incident ticket for you on %s', app.entity);
            builder.Prompts.choice(session, "Do you want me to create an incident ? ", ['Yes','No'])
        }
    },
    function(session,results, next) {
         if (results.response) {
            console.log(results.response);
            if (results.response.entity == 'Yes') {
                session.send('Creating an incident for you');
                snow.createIncident();
                next();
            } else {
               session.endDialog();
            }
        }    
    }, 
    function(session,results) {
        session.endDialog();
    }
]);
}