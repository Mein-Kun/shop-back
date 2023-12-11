import { ApiProperty } from "@nestjs/swagger";

export class Favorites {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 1 })
  partId: number;
}

export class FavoritesRequest {
  @ApiProperty({ example: 1 })
  userId: number;

  @ApiProperty({ example: 1 })
  partId: number;
}

export class GetAllResponse extends Favorites {}

export class FavoritesResponse {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ example: 1 })
  userId: number;

	@ApiProperty({ example: 1 })
  partId: number;

  @ApiProperty({ example: '2023-03-17T17:23:33.502Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-03-17T17:23:33.502Z' })
  createdAt: string;
}
