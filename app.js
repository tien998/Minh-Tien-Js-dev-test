
const fastify = require('fastify')({
    logger: true
})
const { seedDocs, GetAll, Get, Update, Create } = require('./services/elasticServices');


fastify.get('/', async (rq, rs) => {
    return await GetAll().then(docs => {
        docs.hits.hits.forEach(source => {
            console.log(source._source)
        })
    });
})

fastify.get('/:id', async (rq, rs) => {
    var id = parseInt(rq.params['id']);
    return await Get(id).then(doc => {
        doc.hits.hits.forEach(source => {
            console.log(source._source);
        });
    })
})

fastify.put('/:id', async (rq, rs) => {
    var id = rq.params['id'];
    var doc = rq.body;
    await Update(id, doc).then(doc => {
        console.log(doc.hits);
    });
})

fastify.post('/', async (rq, rs) => {
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