import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Get('qr/:id')
  getQr(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getQrCode(id);
  }

  @Get('enter/place/:placeId/:id')
  async attemptToEnter(@Param('placeId', ParseIntPipe) placeId: number, @Param('id', ParseIntPipe) id: number) {
    return this.userService.attemptToEnterPlace(id, placeId);
  }

  @Post('by/name')
  findByName(@Body() { name, surname }: { name: string, surname?: string }) {
    return this.userService.findByName(name, surname);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
