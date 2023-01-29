import { IUserRepository } from "../../domain/repositories/user.repository";


export class UserUseCases {
    constructor(
        readonly UserRepository: IUserRepository
    ) {}


}