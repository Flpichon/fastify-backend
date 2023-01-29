import { IUserRepository } from "../../domain/repositories/user.repository";
import * as bcrypt from 'bcryptjs';
import * as jsonwebtoken from 'jsonwebtoken';
import { User } from "../../domain/entities/user";

export class Authentification {
    constructor(
        readonly UserRepository: IUserRepository
    ) {}

    async generateToken(id: string): Promise<string> {
        const user = await this.UserRepository.findOne(id) as User;
        const token = jsonwebtoken.sign({_id: user.id}, process.env.JWT_SECRET as string, {expiresIn: '100d'});
        await this.UserRepository.addToken(id, token);
        return token;
    }

    async findByToken(token: string): Promise<User | undefined> {
        try {
            if (!token) {
                throw new Error('Missing token header');
            }
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET as string) as jsonwebtoken.JwtPayload;
            return await this.UserRepository.findByToken(decoded._id, token);
        } catch(error) {
            throw error;
        }
    }

    async findByCredentials(username: string, password: string): Promise<User | undefined> {
        const user = await this.UserRepository.findByUsername(username);
        if (!user) {
            throw new Error('Unable to login. Wrong username!');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Unable to login. Wrong Password!');
        }
        return user;
    }
}