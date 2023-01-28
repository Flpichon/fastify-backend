"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const mongodb_1 = require("@fastify/mongodb");
const env_1 = require("@fastify/env");
const cors_1 = require("@fastify/cors");
const auth_1 = require("@fastify/auth");
const app_1 = require("./app");
const routes_1 = require("./routes");
const server = (0, fastify_1.default)({ logger: true });
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
const validate = async (username, password, req, reply) => {
    console.log('validate');
};
const init = async () => {
    server.register(cors_1.fastifyCors);
    server.register(env_1.fastifyEnv, options);
    await server.after();
    const username = encodeURIComponent(server.config.DB_USERNAME);
    const password = encodeURIComponent(server.config.DB_PASSWORD);
    const dataBaseName = 'react-data';
    const url = `mongodb+srv://${username}:${password}@cluster0.pb73pcs.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`;
    server.register(mongodb_1.fastifyMongodb, {
        forceClose: true,
        url
    });
    await server.after();
    const app = new app_1.App(server);
    server.decorate('asyncVerifyUserAndPassword', async (request, reply) => {
        app.loginServ();
    });
    server.register(auth_1.fastifyAuth);
    await server.after();
    const routes = new routes_1.Routes(server);
};
init();
(async () => {
    try {
        await server.ready();
        await server.listen({ port: 8080 });
        console.log('serveur listening');
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
