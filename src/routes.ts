import { FastifyInstance } from "fastify";
import { Authentification } from "./infrastructure/services/authentification";

export class Routes {
    constructor(
        private readonly server: FastifyInstance,
        private readonly auth: Authentification
    ) {
        this.server.route({
            method: 'GET',
            url: '/ping',
            handler: async (request, reply) => {
                await this.ping(request, reply);
            }
        });
        this.server.route({
            method: [ 'POST', 'HEAD' ],
            url: '/login',
            logLevel: 'warn',
            preHandler: this.server.auth([server.asyncVerifyUserAndPassword]),
            handler: async (request, reply) => {
                await this.login(request, reply);
            }
        });

        this.server.route({
            method: [ 'GET', 'HEAD' ],
            url: '/profile',
            logLevel: 'warn',
            preHandler: this.server.auth([ this.server.asyncVerifyJWT ]),
            handler: async (req, reply) => {
                await this.profile(req, reply);
            }
        })
    }

    async ping(request: any, reply: any): Promise<void> {
        const users = await this.server.mongo.db?.collection('user').find().toArray();
        reply.send(users);
    }

    async login(request: any, reply: any): Promise<void> {
        const token = await this.auth.generateToken(request.user.id);
        reply.send({ status: 'You are logged in', user: request.user });
    }

    async profile(request: any, reply: any): Promise<void> {
        reply.send({ status: 'Authenticated!', user: request.user });
    }
}