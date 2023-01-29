import { ObjectId } from "@fastify/mongodb";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/user.repository";
import type { Db } from 'mongodb';

export class MgUserRepository implements IUserRepository {
    constructor(
        private readonly mongodb: Db
    ) {}
    async login(username: string, password: string): Promise<User | undefined> {
        const user = await this.mongodb.collection('user').findOne({username, password});
        if (user) {
            return new User(user._id.toString(), user.name, user.mail, user.password, user.tokens);
        }
    }

    async findOne(id: string): Promise<User | undefined> {
        const user = await this.mongodb.collection('user').findOne({_id: new ObjectId(id)});
        if (user) {
            return new User(user._id.toString(), user.name, user.mail, user.password, user.tokens);
        }
    }

    async addToken(id: string, tokens: string[]): Promise<void> {
        await this.mongodb.collection('user').updateOne({_id: new ObjectId(id)}, {$set: {tokens}});
    }

    async findByToken(id: string, token: string): Promise<User | undefined> {
        console.log("🚀 ~ file: mgUser.repository.ts:33 ~ MgUserRepository ~ user ~ new ObjectId(id)", new ObjectId(id))
        const user = await this.mongodb.collection('user').findOne({
            _id: new ObjectId(id),
            'tokens.0': token
        });
        if (user) {
            return new User(user._id.toString(), user.name, user.mail, user.password, user.tokens);
        }
    }

    async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.mongodb.collection('user').findOne({username});
        if (user) {
            return new User(user._id.toString(), user.name, user.mail, user.password, user.tokens);
        }
    }
}