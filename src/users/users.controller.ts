import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException, Res, HttpStatus } from '@nestjs/common';
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

  // @UseGuards(AuthGuard)
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @UseGuards(AuthGuard)
  // @Get(':id')
  // async findOne(@Param('id') id: string, @Res() res) {
  //   let result = await this.usersService.findOne(+id);
  //   let resultJson = JSON.parse(JSON.stringify(result))
  //   let { password, ...userdata } = resultJson;
  //   if (result !== null) res.status(HttpStatus.OK).json(userdata);
  //   else res.status(HttpStatus.NOT_FOUND).send("User not found");
  // }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Req() request, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res) {
    if (request.user.sub == Number(id)) {
      let result = await this.usersService.update(+id, updateUserDto);
      let { password, ...updatedata } = updateUserDto;
      if (result[0] > 0) res.status(HttpStatus.OK).json(updatedata);
      else res.status(HttpStatus.NOT_FOUND).send("User not found");
    }
    else throw new UnauthorizedException();
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Req() request, @Param('id') id: string, @Res() res) {
    if (request.user.sub == Number(id)) {
      let result = await this.usersService.remove(+id);
      if (result[0] > 0) res.status(HttpStatus.OK).send("User has been deactivated");
      else res.status(HttpStatus.NOT_FOUND).send("User not found");
    }
    else throw new UnauthorizedException();
  }
}
