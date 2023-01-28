import type { Db, MongoClient, MongoClientOptions } from 'mongodb';
import { ObjectId } from 'mongodb';
export {};

export interface FastifyMongoObject {
    /**
     * Mongo client instance
     */
    client: MongoClient;
    /**
     * DB instance
     */
    db?: Db;
    /**
     * Mongo ObjectId class
     */
    ObjectId: typeof ObjectId;
}

export type mongoFastify = FastifyMongoObject & FastifyMongoNestedObject;

export interface FastifyMongoNestedObject {
    [name: string]: FastifyMongoObject;
}
declare module 'fastify' {
    interface FastifyInstance {
        config: {
            DB_PASSWORD: string;
            DB_USERNAME: string;
        };
        asyncVerifyUserAndPassword: any;
    }
}