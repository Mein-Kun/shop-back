import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { FavoritesRequest, FavoritesResponse, GetAllResponse } from "./types";
import { AuthenticatedGuard } from "src/auth/authentificated.guard";
import { ApiBody, ApiOkResponse } from "@nestjs/swagger";
import { AddToCardDto } from "src/shopping-card/dto/add-to-card.dto";


@Controller('favorite')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOkResponse({ type: [GetAllResponse] })
  @UseGuards(AuthenticatedGuard)
  @Get('/:id')
  getAll(@Param('id') userId: number) {
    return this.favoritesService.findAll(userId);
  }

  @ApiOkResponse({ type: FavoritesResponse })
  @UseGuards(AuthenticatedGuard)
  @Post('/add')
  getToCard(@Body() addToCardDto: AddToCardDto) {
    return this.favoritesService.addfavorit(addToCardDto);
  }

	// @ApiOkResponse({ type: FavoritesResponse })
  // @ApiBody({ type: FavoritesRequest })
  // @UseGuards(AuthenticatedGuard)
  // @Get('/:id1/:id2')
  // updateTotalPrice(
  //   @Param('id1') userId: number,
  //   @Param('id2') partId: number,
  // ) {
  //   return this.favoritesService.compare(partId, userId);
  // }

  @UseGuards(AuthenticatedGuard)
  @Delete('/one/:id')
  removeOne(@Param('id') partId: number) {
    return this.favoritesService.remove(partId);
  }
}
