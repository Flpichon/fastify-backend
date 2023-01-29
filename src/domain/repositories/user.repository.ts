import { User } from "../entities/user";

export interface IUserRepository {
    login(username: string, password: string): Promise<User | undefined>;
    findByUsername(username: string): Promise<User | undefined>;
    findOne(id: string): Promise<User | undefined>;
    addToken(id: string, token: string): Promise<void>;
    findByToken(id: string, token: string): Promise<User | undefined>;
}