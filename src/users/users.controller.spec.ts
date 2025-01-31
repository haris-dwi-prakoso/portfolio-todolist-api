import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Response } from 'express';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const testUser = {
    id: 1,
    username: 'test',
    password: 'test',
    isActive: true
  };

  const statusResponseMock = {
    send: jest.fn((x) => x),
  }

  const responseMock = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x),
    json: jest.fn((x) => x)
  } as unknown as Response

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UsersController],
      providers: [
        JwtService,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(() => testUser),
            findAll: jest.fn(() => [testUser]),
            findOne: jest.fn((id: number) => {
              Promise.resolve({
                username: 'test',
                password: 'test',
                isActive: true,
                id: Number(id)
              });
            }),
            update: jest.fn((id: number, data: UpdateUserDto) => {
              Promise.resolve({
                username: 'test',
                password: 'test',
                isActive: true,
                id: Number(id),
                ...data
              });
            }),
            remove: jest.fn((id: number) => {
              Promise.resolve({
                username: 'test',
                password: 'test',
                isActive: false,
                id: Number(id)
              });
            })
          },
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  describe('create', () => {
    it('should create a new user', async () => {
      let result = await controller.create({
        username: 'test',
        password: 'test'
      });
      expect(result).toEqual(testUser);
    })
  });

  describe('update', () => {
    it('should update user data', async () => {
      let result = await controller.update({ user: { sub: 1 } }, '1', { username: 'test1' }, responseMock);
      expect(service.update).toHaveBeenCalled();
    })
  });

  describe('remove', () => {
    it('should update user as inactive', async () => {
      let result = await controller.remove({ user: { sub: 1 } }, '1', responseMock);
      expect(service.remove).toHaveBeenCalled();
    })
  })
});
