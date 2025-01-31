import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

describe('TasksController', () => {
  let controller: TasksController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [TasksController],
      providers: [
        JwtService,
        {
          provide: TasksService,
          useValue: mockService,
        },
        {
          provide: UsersService,
          useValue: mockService,
        }
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
