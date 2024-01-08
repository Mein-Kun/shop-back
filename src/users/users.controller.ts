import {
  Controller,
  Header,
  Post,
  HttpCode,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  LogoutUserResponse,
  SignupResponse,
} from './types';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthenticatedGuard } from 'src/auth/authentificated.guard';
import { access } from 'fs';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOkResponse({ type: SignupResponse })
  @Post('/singup')
  @HttpCode(200)
  @Header('Content-type', 'application/json')
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/login-check')
  async loginCheck(@Request() access_token) {
    return this.authService.loginCheck(access_token);
  }

  @ApiOkResponse({ type: LogoutUserResponse })
  @Get('/loginout')
  loginOut(@Request() req) {
    req.session.destroy();
    return { msg: 'Сессия завершена' };
  }
}
