
const { seedDocs, GetAll, Get, Update, Create } = require('../services/bookServices')

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

const book_api = async (fastify) => {

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
}
module.exports = book_api;