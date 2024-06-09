import { User } from "../../models/User";
import { UserRepository } from "../../repositories/UserRepository";

export class IndexUsersUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<User[]> {
        return await this.userRepository.index();
    }
}