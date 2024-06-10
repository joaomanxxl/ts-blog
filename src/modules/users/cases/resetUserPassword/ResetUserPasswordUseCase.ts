import { compare, hash } from "bcrypt";
import { UserRepository } from "../../repositories/UserRepository";
import { AppDataSource } from "../../../../database";

interface ResetUserPasswordDTO {
    token: string;
    oldPassword: string;
    newPassword: string;
}

export class ResetUserPasswordUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ token, oldPassword, newPassword }: ResetUserPasswordDTO): Promise<void> {
        if (!oldPassword || !newPassword) {
            throw new Error("Missing old password or new password");
        }

        if (newPassword.length < 8) {
            throw new Error("Password is too short");
        }

        const user = await this.userRepository.findByToken(token);

        if (!user) {
            throw new Error("Could not find user");
        }

        const match = await compare(oldPassword, user.password);

        if (!match) {
            throw new Error("Old password is not equal to the given password");
        }

        const password = await hash(newPassword, 10);
        user.password = password;

        await this.userRepository.update(user);
    }
}