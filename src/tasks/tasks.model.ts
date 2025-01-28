import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Task extends Model<Task> {
    @Column({ primaryKey: true })
    id: number;

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
}