import { UserRepository } from "../../repositories/UserRepository";
import { IndexUserController } from "./IndexUserController";
import { IndexUserUseCase } from "./IndexUserUseCase";

const userRepository = UserRepository.getInstance();
const indexUserUseCase = new IndexUserUseCase(userRepository);
export const indexUserController = new IndexUserController(indexUserUseCase);