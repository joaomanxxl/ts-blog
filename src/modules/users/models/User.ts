import { Entity, Column, ObjectIdColumn, CreateDateColumn, BeforeInsert } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
export class User {
    @ObjectIdColumn()
    _id?: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    token: string;

    @BeforeInsert()
    generateId() {
        if (!this._id) {
            this._id = uuidv4();
        }
    }
}