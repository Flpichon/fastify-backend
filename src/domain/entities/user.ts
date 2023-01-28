export class User {
    id: string;
    name: string;
    mail: string;
    password: string;
    tokens: string[];
    constructor(
        rId: string,
        rName: string,
        rMail: string,
        rPassWord: string,
        rTokens?: string[]
    ) {
        this.id = rId;
        this.name = rName;
        this.mail = rMail;
        this.password = rPassWord;
        this.tokens = rTokens ?? [];
    }
}