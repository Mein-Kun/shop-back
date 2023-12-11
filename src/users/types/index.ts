import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ example: 'Avto' })
  username: string;

  @ApiProperty({ example: 'avto123' })
  password: string;
}

export class LoginUserResponse {
  @ApiProperty({
    example: {
      user: {
        userId: 1,
        username: 'Avto',
        password: 'avto123',
      },
    },
  })
  user: {
    userId: number;
    username: string;
    password: string;
  };

  @ApiProperty({ example: 'Loggin in' })
  msg: string;
}

export class LogoutUserResponse {
  @ApiProperty({ example: 'Сессия завершена' })
  msg: string;
}

export class LoginCheckResponse {
  @ApiProperty({ example: '1' })
  userId: number;

  @ApiProperty({ example: 'Avto' })
  username: string;

  @ApiProperty({ example: 'avto123@gmail.com' })
  email: string;
}

export class SignupResponse {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ example: 'Avto' })
  username: string;

  @ApiProperty({ example: '$jhrfg456df.krug34bekurgb.euorghekrghke346' })
  password: string;

  @ApiProperty({ example: 'avto123@gmail.com' })
  email: string;

  @ApiProperty({ example: '2023-03-17T17:23:33.502Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-03-17T17:23:33.502Z' })
  sreatedAt: string;
}
