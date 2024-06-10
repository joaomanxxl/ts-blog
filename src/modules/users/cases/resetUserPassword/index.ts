import { UserRepository } from "../../repositories/UserRepository";
import { ResetUserPasswordController } from "./ResetUserPasswordController";
import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";

const userRepository = UserRepository.getInstance();
const resetUserPasswordUseCase = new ResetUserPasswordUseCase(userRepository);
export const resetUserPasswordController = new ResetUserPasswordController(resetUserPasswordUseCase);