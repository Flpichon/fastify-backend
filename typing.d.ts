import type { Db, MongoClient, MongoClientOptions } from 'mongodb';
import { ObjectId } from 'mongodb';
export {};

export interface FastifyMongoObject {
    client: MongoClient;
    export db?: Db;
    ObjectId: typeof ObjectId;
}

export interface FastifyMongoNestedObject {
    [name: string]: FastifyMongoObject;
}

export type mongoFastify = FastifyMongoObject & FastifyMongoNestedObject;

declare module 'fastify' {
    interface FastifyInstance {
        config: {
            DB_PASSWORD: string;
            DB_USERNAME: string;
        };
        asyncVerifyUserAndPassword: any;
        asyncVerifyJWT: any;
    }
}