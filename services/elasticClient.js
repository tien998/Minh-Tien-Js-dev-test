const { Client } = require('@elastic/elasticsearch');


var client = new Client({
    node: 'https://127.0.0.1:9200',
    auth: {
        username: 'elastic',
        password: 'N5PtYbN29AK+*mnZCgX4',
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = client;