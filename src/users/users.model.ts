import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Task } from '../tasks/tasks.model';

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

    @HasMany(() => Task)
    tasks: Task[];
}