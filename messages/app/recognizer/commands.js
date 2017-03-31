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
    profile: () => ({
        intent: 'Profile',
        score: 1
    }),

    remit:()=> ({
        intent: 'Remit',
        score: 1
    }),

    reset: () => ({
        intent: 'Reset',
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