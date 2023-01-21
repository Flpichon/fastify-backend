export {};

declare module 'fastify' {
    interface FastifyInstance {
        config: {
            DB_PASSWORD: string;
            DB_USERNAME: string;
        };
    }
}