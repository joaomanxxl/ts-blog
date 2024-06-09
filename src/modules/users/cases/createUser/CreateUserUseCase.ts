import { UserRepository } from "../../repositories/UserRepository";

interface CreateUserDTO {
    username: string;
    password: string;
}

export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ username, password }: CreateUserDTO): Promise<void> {
        if (await this.userRepository.findByUsername(username)) {
            throw new Error("User already exists");
        }

        if (password.length < 8) {
            throw new Error("Password needs to be 8 characters long");
        }

        await this.userRepository.create({ username, password });
    }
}