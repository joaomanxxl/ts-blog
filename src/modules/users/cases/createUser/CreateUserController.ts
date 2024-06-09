import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { username, password } = request.body;

        await this.createUserUseCase.execute({ username, password })
                .catch(error => response.status(400).json({ error: error.message }));

        return response.status(201).send();
    }
}