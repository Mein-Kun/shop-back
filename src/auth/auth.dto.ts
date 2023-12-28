import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthUserDto {
  @ApiProperty({ example: 'avto' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'avto123' })
  @IsNotEmpty()
  readonly password: string;
}