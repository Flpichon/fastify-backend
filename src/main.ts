import fastify from 'fastify';
import {fastifyMongodb} from '@fastify/mongodb';
import {fastifyEnv} from '@fastify/env';
import { fastifyCors } from '@fastify/cors';
import { fastifyAuth } from '@fastify/auth';
import { App } from './app';
import { Routes } from './routes';

const server = fastify({logger: true});

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

const authenticate = { realm: 'Westeros' };
const validate = async (username: string, password: string, req: any, reply: any) => {
    console.log('validate')
} 

const init = async () => {
    server.register(fastifyCors);
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
    await server.after();
    const app = new App(server);
    server.decorate('asyncVerifyUserAndPassword', async (request: any, reply: any) => {
        app.loginServ();
    });
    server.register(fastifyAuth);
    await server.after();
    const routes = new Routes(server);
};

init();

(async () => {
    try {
        await server.ready();
        await server.listen({port: 8080});
        console.log('serveur listening');
        
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
})();