import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() user: User): Observable<User> {
    return this.authService.create(user);
  }

  @Post('login')
  login(@Body() user :User):Observable<string>{
    return this.authService.login(user);
  }
}
