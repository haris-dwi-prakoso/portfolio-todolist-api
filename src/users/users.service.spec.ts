import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from './users.model';

describe('UsersService', () => {
  let service: UsersService;
  let model: typeof User;

  const testUser = {
    id: 1,
    username: 'test',
    password: 'test'
  };

  const mockUsersService = {
    create: jest.fn(() => testUser),
    findAll: jest.fn(() => [testUser]),
    findOne: jest.fn(),
    update: jest.fn(() => testUser),
    remove: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: mockUsersService
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<typeof User>(getModelToken(User));
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const result = await service.create({
        username: 'test',
        password: 'test'
      });

      expect(result).toEqual(testUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateStub = jest.fn();
      const findSpy = jest.spyOn(model, 'findOne').mockReturnValueOnce({
        update: updateStub,
      } as any);

      expect(service.update(1, {
        username: 'test1',
        password: 'test1'
      }));
      expect(findSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('remove', () => {
    it('should update a user to inactive', async () => {
      const updateStub = jest.fn();
      const findSpy = jest.spyOn(model, 'findOne').mockReturnValueOnce({
        update: updateStub,
      } as any);

      expect(service.remove(1));
      expect(findSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
