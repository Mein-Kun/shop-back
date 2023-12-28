import {
  Controller,
  Header,
  HttpStatus,
  Post,
  HttpCode,
  Body,
  UseGuards,
  Request,
  Get,
  UsePipes,
  ValidationPipe,
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
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/auth/constant';
import { AuthUserDto } from 'src/auth/auth.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: SignupResponse })
  @Post('/singup')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Header('Content-type', 'application/json')
  createUser(@Body() dto: CreateUserDto) {
    return this.authService.create(dto);
  }

  @ApiBody({ type: LoginUserRequest })
  @ApiOkResponse({ type: LoginUserResponse })
  @UsePipes(new ValidationPipe())
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Body() dto: AuthUserDto) {
    return this.authService.login(dto)
  }

  @ApiOkResponse({ type: LoginCheckResponse })
  @Get('/login-check')
  @Public()
  @UseGuards(AuthenticatedGuard)
  async loginCheck(@Request() req) {
    return req.user;
  }

  @ApiOkResponse({ type: LogoutUserResponse })
  @Get('/loginout')
  loginOut(@Request() req) {
    req.session.destroy();
    return { msg: 'Сессия завершена' };
  }
}
