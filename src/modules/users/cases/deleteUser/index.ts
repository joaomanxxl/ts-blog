import { UserRepository } from "../../repositories/UserRepository";
import { DeleteUserController } from "./DeleteUserController";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

const userRepository = UserRepository.getInstance();
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);