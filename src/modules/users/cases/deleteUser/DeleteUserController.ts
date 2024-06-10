import { Request, Response } from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
    constructor(private deleteUserUseCase: DeleteUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const token = request.headers.authorization.split(' ')[1];
        const { username } = request.params;

        return await this.deleteUserUseCase.execute({ token, username })
            .catch(error => response.status(403).json({ error: error.message }))
            .then(() => response.status(200).send());
    }
}