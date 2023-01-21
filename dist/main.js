"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const mongodb_1 = require("@fastify/mongodb");
const env_1 = require("@fastify/env");
const cors_1 = require("@fastify/cors");
const app_1 = require("./app");
const server = (0, fastify_1.default)({ logger: true });
server.get('/ping', async (request, reply) => {
    var _a;
    // return 'pong\n';
    const users = await ((_a = server.mongo.db) === null || _a === void 0 ? void 0 : _a.collection('user').find().toArray());
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
    server.register(env_1.fastifyEnv, options);
    server.register(cors_1.fastifyCors);
    await server.after();
    const username = encodeURIComponent(server.config.DB_USERNAME);
    const password = encodeURIComponent(server.config.DB_PASSWORD);
    const dataBaseName = 'react-data';
    const url = `mongodb+srv://${username}:${password}@cluster0.pb73pcs.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`;
    server.register(mongodb_1.fastifyMongodb, {
        forceClose: true,
        url
    });
};
init();
(async () => {
    try {
        await server.ready();
        await server.listen({ port: 8080 });
        new app_1.App(server);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
