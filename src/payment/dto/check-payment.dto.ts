import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CheckPaymentDto {
  @ApiProperty({ example: '2ca75025-000f-5000-8000-18660fc6cdf3' })
  @IsNotEmpty()
  readonly paymentId: string;
}
