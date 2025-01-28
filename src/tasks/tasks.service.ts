import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private tasks: typeof Task
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    return await this.tasks.create(createTaskDto);
  }

  async findAll() {
    return await this.tasks.findAll();
  }

  async findAllByUserId(userId: number, status?: string) {
    let whereQuery: any = {
      userId: userId
    };
    if (status == "done") whereQuery["isDone"] = true;
    else if (status == "in_progress") whereQuery["isDone"] = false;
    return await this.tasks.findAll({
      where: whereQuery
    })
  }

  async findOne(id: number, userId: number) {
    return await this.tasks.findOne({
      where: { id: id, userId: userId }
    });
  }

  async update(id: number, userId: number, updateTaskDto: UpdateTaskDto) {
    return await this.tasks.update(updateTaskDto,
      {
        where: { id: id, userId: userId }
      }
    );
  }

  async remove(id: number, userId: number) {
    return await this.tasks.destroy({
      where: { id: id, userId: userId }
    });
  }
}
