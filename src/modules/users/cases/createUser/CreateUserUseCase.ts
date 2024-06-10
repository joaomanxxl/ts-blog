import { User } from "../../models/User";
import { UserRepository } from "../../repositories/UserRepository";

interface CreateUserDTO {
    username: string;
    password: string;
}

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ username, password }: CreateUserDTO): Promise<User> {
        if (!username || !password) {
            throw new Error("Missing username or password");
        }

        if (username.length < 3) {
            throw new Error("Username is too short");
        }

        const user = await this.userRepository.findByUsername(username);
        if (user) {
            throw new Error("User already exists")
        }

        if (password.length < 8) {
            throw new Error("Password is too short");
        }

        return await this.userRepository.create({ username, password });
    }
}