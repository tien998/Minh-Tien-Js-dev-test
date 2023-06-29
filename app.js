
const fastify = require('fastify')({
    logger: true
})
const io = require('./services/socket.io_service')
const { createCmtIndex } = require('./services/commentServices');
const { seedBookDocs } = require('./services/bookServices')

const book_api = require('./api_registers/book_api');
const cmt_api = require('./api_registers/comment_api');

fastify.register(io);

fastify.register(book_api);

fastify.register(cmt_api)

// Seed data
fastify.put('/seedDocs', async (rq, rs) => {
    await seedBookDocs();
    await createCmtIndex();
});

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