import fastify from 'fastify';
import {fastifyMongodb} from '@fastify/mongodb';
import {fastifyEnv} from '@fastify/env';
import { fastifyCors } from '@fastify/cors';
import { fastifyAuth } from '@fastify/auth';
import { App } from './app';
import { Routes } from './routes';
import * as bcrypt from 'bcryptjs';

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
        try {
            if (!request.body) {
                throw new Error('username and Password is required!');
            }
            const user = await app.authService.findByCredentials(request.body.username, request.body.password);
            request.user = user;
        } catch (error) {
            reply.code(400).send(error);
        }
    });
    server.decorate('asyncVerifyJWT', async (request: any, reply: any) => {
        try {
            if (!request.headers.authorization) {
                throw new Error('No token was sent');
            }
            const token = request.headers.authorization.replace('Bearer ', '');
            const user = await app.authService.findByToken(token);
            if (!user) {
                throw new Error('Authentication failed!');
            }
            request.user = user;
            request.token = token; 
        } catch (error) {
            reply.code(401).send(error);
        }
    });
    server.register(fastifyAuth);
    await server.after();
    const routes = new Routes(server, app.authService);
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