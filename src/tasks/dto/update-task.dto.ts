import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsDate } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    taskName: string;
    taskDescription: string;
    @IsDate()
    dueDate?: Date;
    isDone?: boolean
}
