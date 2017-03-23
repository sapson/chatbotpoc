var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var request = require('request');
var btoa = require('btoa');

function createServiceNowIncident() {
    var requestBody = "{\"category\":\"software\",\"caller_id\":\"gcg004\",\"short_description\":\"Incident created via API\",\"description\":\"Test\"}"; 
    var url = "https://gemdev.service-now.com/api/now/table/incident";
    request({
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Basic '+btoa('RobBott'+':'+'GEMccPOC')
        },
        uri:url,
        body:requestBody,
        method:'POST'
    }, function (err,res,body) {
       console.log(body) ;
    });
}


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
                createServiceNowIncident();
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