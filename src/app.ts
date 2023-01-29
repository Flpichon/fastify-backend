import { FastifyInstance } from "fastify";
import { MgUserRepository } from "./infrastructure/repositories/mgUser.repository";
import { Authentification } from "./infrastructure/services/authentification";

export class App {
    db: any;
    authService: Authentification;
    constructor(server: FastifyInstance) {
        this.db = server.mongo.db;
        const userRepository = new MgUserRepository(this.db);
        this.authService = new Authentification(userRepository);
    }

}