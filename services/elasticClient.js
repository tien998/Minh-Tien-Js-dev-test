const { Client } = require('@elastic/elasticsearch');


var client = new Client({
    node: 'https://127.0.0.1:9200',
    auth: {
        username: 'elastic',
        password: 'XOcs1X-S=_AWT_eIGH8J',
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = client;