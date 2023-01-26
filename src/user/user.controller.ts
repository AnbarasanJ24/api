import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() user: UserInterface): Observable<UserInterface> {
    return this.userService.create(user);
  }

  @Get()
  findAll(): Observable<UserInterface[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<UserInterface> {
    return this.userService.findOne(Number(id));
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() user: UserInterface): Observable<UserInterface> {
    return this.userService.updateOne(Number(id), user)
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<UserInterface> {
    return this.userService.deleteOne(Number(id));
  }
}
