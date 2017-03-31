var request = require('request');
var btoa = require('btoa');
var config = require('../../config');

var snow = {
    createIncident: function () {
        var requestBody = "{\"category\":\"software\",\"caller_id\":\"gcg004\",\"short_description\":\"Incident created via API\",\"description\":\"Test\"}";
        var url = config.snowUrl + config.incident;
        request({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(config.snowUser + ':' + config.snowPassword)
            },
            uri: url,
            body: requestBody,
            method: 'POST'
        }, function (err, res, body) {
            console.log(body);
        });
    },

    getIncidentByNbr: function(ticketnbr){},

    getIncidentsForUser: function(user){},

    createRequest: function(){},

    getRequestsForUser: function(user){},

    retrieveAttachment: function(){},

    uploadAttachment: function(){}
}

module.exports = snow;