import { Repository } from "typeorm";
import { User } from "../models/User";
import { AppDataSource } from "../../../database";
import { compare, hash } from "bcrypt";
import { generateAccessToken } from "../../../jwt";

interface CreateUserDTO {
    username: string;
    password: string;
}

export class UserRepository {
    users: Repository<User>;

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

    async create({ username, password }: CreateUserDTO): Promise<User> {
        const hashPassword = await hash(password, 10);
        const token = generateAccessToken(username);

        const user = this.users.create({
            username,
            password: hashPassword,
            created_at: new Date(),
            token
        });

        await this.users.save(user);

        return user;
    }

    async findByUsername(username: string): Promise<User> {
        return await this.users.findOne({ where: { username } });
    }

    async findById(_id: string): Promise<User> {
        return await this.users.findOne({ where: { _id } });
    }

    async findByToken(token: string): Promise<User> {
        return await this.users.findOne({ where: { token } });
    }

    async update(user: User): Promise<void> {
        await this.users.update({ username: user.username }, user);
    }

    async delete(user: User): Promise<void> {
        await this.users.delete({ username: user.username });
    }
}