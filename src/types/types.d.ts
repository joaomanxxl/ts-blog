import { User } from "../modules/users/models/User";

declare module "express-serve-static-core" {
    interface Request {
        user?: User;
    }
}