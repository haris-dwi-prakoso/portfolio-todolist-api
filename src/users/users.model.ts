import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @Column({ primaryKey: true })
    id: number;

    @Column
    username: string;

    @Column
    password: string;

    @Column({ defaultValue: true })
    isActive: boolean;
}