export class User {
    id: string;
    name: string;
    mail: string;
    password: string;
    token: string;
    constructor(
        rId: string,
        rName: string,
        rMail: string,
        rPassWord: string,
        rToken?: string
    ) {
        this.id = rId;
        this.name = rName;
        this.mail = rMail;
        this.password = rPassWord;
        this.token = rToken ?? '';
    }
}