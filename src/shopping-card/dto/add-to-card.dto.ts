import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddToCardDto {
  @ApiProperty({ example: 'avto' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  userId?: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  readonly partId: number;
}
