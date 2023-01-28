import fastifyMongodb, { ObjectId } from "@fastify/mongodb";
import { mongoFastify } from "../../../typing";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/user.repository";

export class MgUserRepository implements IUserRepository {
    constructor(
        private readonly mongodb: mongoFastify
    ) {}
    async login(username: string, password: string): Promise<User | undefined> {
        const user = await this.mongodb.db?.collection('user').findOne({username, password});
        if (user) {
            return new User(user._id.toString(), user.name, user.mail, user.password, user.tokens);
        }
    }

    async findOne(id: string): Promise<User | undefined> {
        const user = await this.mongodb.db?.collection('user').findOne({_id: new ObjectId(id)});
        if (user) {
            return new User(user._id.toString(), user.name, user.mail, user.password, user.tokens);
        }
    }

    async addToken(id: string, tokens: string[]): Promise<void> {
        await this.mongodb.db?.collection('user').updateOne({_id: new ObjectId(id)}, {tokens});
    }

    async findByToken(id: string, token: string): Promise<User | undefined> {
        const user = await this.mongodb.db?.collection('user').findOne({
            _id: new ObjectId(id),
            'tokens.token': token
        });
        if (user) {
            return new User(user._id.toString(), user.name, user.mail, user.password, user.tokens);
        }
    }
}