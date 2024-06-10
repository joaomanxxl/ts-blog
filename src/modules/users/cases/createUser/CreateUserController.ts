import { Request, Response } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";
import { generateAccessToken } from "../../../../jwt";

export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { username, password } = request.body;

        return await this.createUserUseCase.execute({ username, password })
            .catch(error => response.status(400).json({ error: error.message }))
            .then(() => {
                // Crazy workaround
                const token = generateAccessToken(username);

                return response.status(201).json({ token });
            });
    }
}