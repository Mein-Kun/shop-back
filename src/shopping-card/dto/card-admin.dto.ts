import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CardAdminDto {

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  readonly userId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  readonly order: number;
}
