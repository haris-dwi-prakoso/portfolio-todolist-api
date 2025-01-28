import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() request, @Body() createTaskDto: CreateTaskDto) {
    let toCreate = { ...createTaskDto }
    toCreate.userId = request.user.sub;
    return this.tasksService.create(toCreate);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request, @Query('status') status?: string) {
    let userId = request.user.sub;
    return this.tasksService.findAllByUserId(userId, status);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Req() request, @Param('id') id: string) {
    let userId = request.user.sub;
    return this.tasksService.findOne(+id, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Req() request, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    let userId = request.user.sub;
    return this.tasksService.update(+id, userId, updateTaskDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Req() request, @Param('id') id: string) {
    let userId = request.user.sub;
    return this.tasksService.remove(+id, userId);
  }
}
