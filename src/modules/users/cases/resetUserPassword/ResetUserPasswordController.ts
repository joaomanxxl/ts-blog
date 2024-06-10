import { Request, Response } from "express";

import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";

export class ResetUserPasswordController {
    constructor(private resetUserPasswordUseCase: ResetUserPasswordUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const token = request.headers.authorization.split(' ')[1];
        const { oldPassword, newPassword } = request.body;

        return await this.resetUserPasswordUseCase.execute({ token, oldPassword, newPassword })
            .catch(error => response.status(400).json({ error: error.message }))
            .then(() => response.status(201).send());
    }
}