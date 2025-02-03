import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model';

@Table
export class Task extends Model<Task> {
    @Column({ primaryKey: true })
    id: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @Column
    taskName: string;

    @Column
    taskDescription: string;

    @Column({ allowNull: true })
    dueDate: Date;

    @Column({ defaultValue: false })
    isDone: boolean;

    @BelongsTo(() => User)
    user: User;
}