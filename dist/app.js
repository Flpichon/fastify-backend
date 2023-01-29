"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const mgUser_repository_1 = require("./infrastructure/repositories/mgUser.repository");
const authentification_1 = require("./infrastructure/services/authentification");
class App {
    constructor(server) {
        this.db = server.mongo.db;
        const userRepository = new mgUser_repository_1.MgUserRepository(this.db);
        this.authService = new authentification_1.Authentification(userRepository);
    }
}
exports.App = App;
