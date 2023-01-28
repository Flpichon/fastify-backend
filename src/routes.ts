import { FastifyInstance } from "fastify";

export class Routes {
    constructor(
        private readonly server: FastifyInstance
    ) {
        this.server.route({
            method: 'GET',
            url: '/ping',
            preHandler: this.server.auth([
                server.asyncVerifyUserAndPassword
            ]),
            handler: async (request, reply) => {
                await this.ping(request, reply);
            }
        })
    }

    async ping(request: any, reply: any): Promise<void> {
        const users = await this.server.mongo.db?.collection('user').find().toArray();
        console.log('yolo', users ? users[0] : []);
        reply.send(users);
    }
}