
const fastify = require('fastify')({
    logger: true
})



// Enable socket.io to display comments
const { Server } = require('socket.io');
const book_api = require('./api_registers/book_api');

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

fastify.register(book_api);


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