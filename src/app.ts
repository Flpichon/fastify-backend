export class App {
    db: any
    constructor(server: any) {
        const db = server.mongo.db;
    }

    loginServ() {
        console.log('yo pi');
    };
}