import { Repository } from "typeorm";
import { User } from "../models/User";
import { AppDataSource } from "../../../database";
import { hash } from "bcrypt";
import { generateAccessToken } from "../../../jwt";

interface CreateUserDTO {
    username: string;
    password: string;
}

export class UserRepository {
    private users: Repository<User>;

    private static INSTANCE: UserRepository;

    private constructor() {
        this.users = AppDataSource.getMongoRepository(User);
    }

    static getInstance(): UserRepository {
        if (!UserRepository.INSTANCE) {
            UserRepository.INSTANCE = new UserRepository();
        }

        return UserRepository.INSTANCE;
    }

    async index(): Promise<User[]> {
        return await this.users.find();
    }

    async create({ username, password }: CreateUserDTO): Promise<void> {
        const hashPassword = await hash(password, 10);
        const token = generateAccessToken(username);

        const user = this.users.create({
            username,
            password: hashPassword,
            created_at: new Date(),
            token
        });

        await this.users.save(user);
    }

    async findByUsername(username: string): Promise<User> {
        return await this.users.findOne({ where: { username } });
    }

    async findById(_id: string): Promise<User> {
        return await this.users.findOne({ where: { _id } });
    }
}