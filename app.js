
const fastify = require('fastify')({
    logger: true
})
const { seedDocs, GetAll, Get, Update, Create } = require('./services/elasticServices');

//  JSON Schema to validate input data before upload to database
const validateSchema = {
    schema: {
        body: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                title: { type: 'string' },
                author: { type: 'string' },
                publishedDate: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' }
            }
        }
    }
}


// Enable socket.io to display comments
const { Server } = require('socket.io');

const io = new Server(fastify.server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

var mesArr = [];

io.on('connection', socket => {
    socket.on('message', mes => {
        mesArr.push(mes.toString());
        socket.emit('message', mesArr)
    })
    socket.emit('message', mesArr)
});


fastify.get('/book', async (rq, rs) => {
    var docs = await GetAll();
    return docs;
})

fastify.get('/book/:id', async (rq, rs) => {
    var id = parseInt(rq.params['id']);
    var doc = await Get(id);
    return doc;
});

fastify.put('/book/:id', validateSchema, async (rq, rs) => {
    var id = rq.params['id'];
    var doc = rq.body;
    await Update(id, doc)
})

fastify.post('/book', validateSchema, async (rq, rs) => {
    console.log(rq.body);
    await Create(rq.body);
})

// Seed data
fastify.put('/seedDocs', async (rq, rs) => {
    await seedDocs();
})

const start = async () => {
    try {
        await fastify.listen({ port: 3001 });
    }
    catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start();