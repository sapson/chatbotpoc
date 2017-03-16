const unrecognized = {
    entities: [],
    intent: null,
    intents: [],
    score: 0
};

const parse = {
    parse: function (context, text) {
        const parts = text.split(':');
        const command = parts[0];

        console.log('Resolved [%s] as [%s] command', text, command);

        const action = this[command] || this[command.slice(1)];
        if (!action) {
            return unrecognized;
        } else {
            return action.call(this, context, ...parts.slice(1));
        }
    },

    createincident: (context, parent) => ({
        entities: [{
            entity: application,
            score: 1,
            type: 'Application'
        }],
        intent: ('RaiseIncident'),
        score: 1
    }),
    getinformation: (context, parent) => ({
        entities: [{
            entity: application,
            score: 1,
            type: 'Application'
        }],
        intent: ('GetInformation'),
        score: 1
    }),
    help:(context, parent) => ({
        entities: [{
            entity: application,
            score: 1,
            type: 'Application'
        }],
        intent: ('RequestHelp'),
        score: 1
    })
};


module.exports = {
    recognize: function (context, callback) {
        const text = context.message.text;

        if (!text.startsWith('/') && !['next', 'more'].includes(text)) {
            callback.call(null, null, unrecognized);
        } else {
            callback.call(null, null, parse.parse(context, text));
        }
    }
};