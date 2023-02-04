import { FastifyInstance } from "fastify";
import { CardUseCases } from "./application/useCases/card.useCases";
import { MgCardRepository } from "./infrastructure/repositories/mgCard.repository";
import { MgUserRepository } from "./infrastructure/repositories/mgUser.repository";
import { Authentification } from "./infrastructure/services/authentification";

export class App {
    db: any;
    authService: Authentification;
    cardUseCases: CardUseCases;
    constructor(server: FastifyInstance) {
        this.db = server.mongo.db;
        const userRepository = new MgUserRepository(this.db);
        const cardRepository = new MgCardRepository(this.db);
        this.authService = new Authentification(userRepository);
        this.cardUseCases = new CardUseCases(cardRepository);   
    }

}