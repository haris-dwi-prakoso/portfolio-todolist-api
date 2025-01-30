import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './tasks.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Task]), UsersModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [SequelizeModule]
})
export class TasksModule { }
