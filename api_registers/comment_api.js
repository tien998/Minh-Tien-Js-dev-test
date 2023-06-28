const { GetCmt, PostCmt } = require('../services/commentServices');

const cmt_api = async (fastify) => {

    fastify.get('/getCmt/:id', async (rq, rs) => {  
        return await GetCmt(rq.params['id']);
    })

    fastify.post('/postCmt', async (rq, rs) => {
        await PostCmt(rq.body);
    })
}

module.exports = cmt_api;