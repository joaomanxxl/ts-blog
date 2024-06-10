import { Response } from "express";
import { IndexUsersUseCase } from "./IndexUsersUseCase";

export class IndexUsersController {
    constructor(private indexUsersUseCase: IndexUsersUseCase) {}

    async handle(response: Response): Promise<Response> {
        const users = await this.indexUsersUseCase.execute();

        return response.status(200).json({ users: users });
    }
}