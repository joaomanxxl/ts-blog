import { UserRepository } from "../../repositories/UserRepository";
import { IndexUsersController } from "./IndexUsersController";
import { IndexUsersUseCase } from "./IndexUsersUseCase";

const userRepository = UserRepository.getInstance();
const indexUsersUseCase = new IndexUsersUseCase(userRepository);
export const indexUsersController = new IndexUsersController(indexUsersUseCase);