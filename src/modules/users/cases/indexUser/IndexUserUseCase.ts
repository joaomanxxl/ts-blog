import { User } from "../../models/User";
import { UserRepository } from "../../repositories/UserRepository";

export class IndexUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(username: string): Promise<User> {
        const user = await this.userRepository.findByUsername(username);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }
}