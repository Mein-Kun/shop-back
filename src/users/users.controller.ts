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
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
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
import { LoggingInterceptor } from 'src/auth/logging.interceptor';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/constant';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService, private authService: AuthService) {}

  @ApiOkResponse({ type: SignupResponse })
  @Post('/singup')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.create(CreateUserDto);
  }

  @ApiBody({ type: LoginUserRequest })
  @ApiOkResponse({ type: LoginUserResponse })
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  // @UseInterceptors(LoggingInterceptor)
  // @Header('Set-Cookie', 'SameSite=None')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiOkResponse({ type: LoginCheckResponse })
  @Get('/login-check')
  @Public()
  @UseGuards(AuthenticatedGuard)
  // @UseInterceptors(LoggingInterceptor)
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
