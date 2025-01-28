import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Req() request, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (request.user.sub == Number(id)) return this.usersService.update(+id, updateUserDto);
    else throw new UnauthorizedException();
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Req() request, @Param('id') id: string) {
    if (request.user.sub == Number(id)) return this.usersService.remove(+id);
    else throw new UnauthorizedException();
  }
}
