import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException, Query, Res, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UsersService } from 'src/users/users.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService
  ) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() request, @Body() createTaskDto: CreateTaskDto, @Res() res) {
    let user = await this.usersService.findOne(+request.user.sub);
    if (!user.isActive) res.status(HttpStatus.FORBIDDEN).send("Deactivated users cannot create new tasks");
    else {
      let toCreate = { ...createTaskDto }
      toCreate.userId = request.user.sub;
      return this.tasksService.create(toCreate);
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request, @Query('status') status?: string) {
    let userId = request.user.sub;
    return this.tasksService.findAllByUserId(userId, status);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Req() request, @Param('id') id: string, @Res() res) {
    let userId = request.user.sub;
    let result = await this.tasksService.findOne(+id, userId);
    if (result !== null) res.status(HttpStatus.OK).json(result);
    else res.status(HttpStatus.NOT_FOUND).send("Task not found or not registered under this user");
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Req() request, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Res() res) {
    let userId = request.user.sub;
    let result = await this.tasksService.update(+id, userId, updateTaskDto);
    if (result[0] > 0) res.status(HttpStatus.OK).send("Task successfully updated");
    else res.status(HttpStatus.NOT_FOUND).send("Task not found or not registered under this user");
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Req() request, @Param('id') id: string, @Res() res) {
    let userId = request.user.sub;
    let result = await this.tasksService.remove(+id, userId);
    if (result > 0) res.status(HttpStatus.OK).send("Task successfully deleted");
    else res.status(HttpStatus.NOT_FOUND).send("Task not found or not registered under this user");
  }
}
