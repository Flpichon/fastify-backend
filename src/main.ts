import fastify from 'fastify';
import {fastifyMongodb} from '@fastify/mongodb';
import {fastifyEnv} from '@fastify/env';
import { App } from './app';

const server = fastify({logger: true});

server.get('/ping', async (request, reply) => {
    // return 'pong\n';
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Methods", "GET");
    const users = await server.mongo.db?.collection('user').find().toArray();
    console.log('found', users ? users[0] : []);
    reply.send(users);
});

const schema = {
    type: 'object',
    required: ['DB_PASSWORD', 'DB_USERNAME'],
    properties: {
        DB_PASSWORD: {
            type: 'string'
        },
        DB_USERNAME: {
            type: 'string'
        }
    }
};

const options = {
    confKey: 'config',
    schema,
    dotenv: true,
    data: process.env
};

const init = async () => {
    server.register(fastifyEnv, options);
    await server.after();
    const username = encodeURIComponent(server.config.DB_USERNAME);
    const password = encodeURIComponent(server.config.DB_PASSWORD);
    const dataBaseName = 'react-data';

    const url = `mongodb+srv://${username}:${password}@cluster0.pb73pcs.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`;
    server.register(fastifyMongodb, {
        forceClose: true,
        url
    });
};

init();

(async () => {
    try {
        await server.ready();
        await server.listen({port: 8080});
        new App(server);
        
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
})();