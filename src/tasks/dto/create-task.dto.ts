export class CreateTaskDto {
    userId?: number;
    taskName: string;
    taskDescription: string;
    dueDate?: Date;
    isDone?: boolean
}
