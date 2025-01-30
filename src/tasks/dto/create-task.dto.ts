import { IsNotEmpty, IsDate, IsNumber } from "class-validator";

export class CreateTaskDto {
    @IsNumber()
    userId?: number;
    @IsNotEmpty()
    taskName: string;
    @IsNotEmpty()
    taskDescription: string;
    @IsDate()
    dueDate?: Date
}
