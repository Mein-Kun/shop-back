import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'avto' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'avto123' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: 'avto123@gmail.com' })
  @IsNotEmpty()
  readonly email: string;
}
