// Enable socket.io to display comments
const { Server } = require('socket.io');
const { PostCmt } = require('./commentServices');

const io = async (fastify) => {
    const io = new Server(fastify.server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST']
        }
    });

    var mesArr = [];
    io.on('connection', socket => {
        socket.on('message', async (mes) => {
            if (mes === {}) {
                socket.emit('message', mesArr);
            }
            else {
                await PostCmt(mes);
                mesArr.push(mes);
                socket.emit('message', mesArr);
                console.log('_________ message: ', mes);
            }
        })
    });

}

module.exports = io;