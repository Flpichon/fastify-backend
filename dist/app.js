"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
class App {
    constructor(server) {
        const db = server.mongo.db;
        console.log(db);
    }
}
exports.App = App;
