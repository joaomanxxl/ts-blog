import { UserRepository } from "../../repositories/UserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const userRepository = UserRepository.getInstance();
const createUserUseCase = new CreateUserUseCase(userRepository);
export const createUserController = new CreateUserController(createUserUseCase);