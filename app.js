
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

fastify.get('/', async (rq, rs) => {
    var docs = await GetAll();
    console.log('___________ GetBooks: ', docs);
    return docs;
})

fastify.get('/:id', async (rq, rs) => {
    var id = parseInt(rq.params['id']);
    var doc = await Get(id);
    console.log('___________ GetBooks: ', doc);
    return doc;
});

fastify.put('/:id', validateSchema, async (rq, rs) => {
    var id = rq.params['id'];
    var doc = rq.body;
    console.log('_________________________ Update : ',doc);
    await Update(id, doc)
})

fastify.post('/', validateSchema, async (rq, rs) => {
    console.log(rq.body);
    await Create(rq.body);
    console.log('_________________________ (Frome App.js) Doc is created');
})

// Seed data
fastify.put('/seedDocs', async (rq, rs) => {
    try {
        await seedDocs();
        console.log('__________Seed success!')
    }
    catch (err) {
        console, log('__________Seed false:', err)
    }
})

const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
    }
    catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start();