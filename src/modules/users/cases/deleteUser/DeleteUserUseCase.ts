import { UserRepository } from "../../repositories/UserRepository";

interface DeleteUserDTO {
    token: string;
    username: string;
}

export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ token, username }: DeleteUserDTO): Promise<void> {
        const user = await this.userRepository.findByToken(token);

        if (user.username !== process.env.ADMIN_USERNAME) {
            throw new Error("Not authorized");
        }

        if (user.username === username) {
            throw new Error("Why would you want to delete yourself?");
        }

        const target = await this.userRepository.findByUsername(username);

        if (!target) {
            throw new Error("User not found");
        }

        await this.userRepository.delete(target);
    }
}