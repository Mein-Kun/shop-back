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
import { AuthenticatedGuard } from 'src/auth/authentificated.guard';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
  LoginCheckResponse,
  LoginUserRequest,
  LoginUserResponse,
  LogoutUserResponse,
  SignupResponse,
} from './types';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly UsersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOkResponse({ type: SignupResponse })
  @Post('/singup')
  // @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Header('Content-type', 'application/json')
  createUser(@Body() dto: CreateUserDto) {
    return this.UsersService.create(dto);
  }

  // @ApiBody({ type: LoginUserRequest })
  // @ApiOkResponse({ type: LoginUserResponse })
  // @UsePipes(new ValidationPipe())
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @ApiOkResponse({ type: LoginCheckResponse })
  @Get('/login-check')
  @UseGuards(JwtAuthGuard)
  // @UseGuards(AuthenticatedGuard)
  loginCheck(@Request() req) {
    return req.user;
  }

  @ApiOkResponse({ type: LogoutUserResponse })
  @Get('/loginout')
  loginOut(@Request() req) {
    req.session.destroy();
    return { msg: 'Сессия завершена' };
  }
}
