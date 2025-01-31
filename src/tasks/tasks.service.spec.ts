import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/sequelize';
import { Task } from './tasks.model';

describe('TasksService', () => {
  let service: TasksService;
  let model: typeof Task;

  const mockTasksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task),
          useValue: mockTasksService
        }
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get<typeof Task>(getModelToken(Task))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
