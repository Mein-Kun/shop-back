import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ShoppingCardService } from './shopping-card.service';
import { AuthenticatedGuard } from '../auth/authentificated.guard';
import { AddToCardDto } from './dto/add-to-card.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
  AddToCardResponse,
  GetAllResponse,
  OrderRequest,
  OrderResponse,
  StatusRequest,
  StatusResponse,
  TotalPriceRequest,
  TotalPriceResponse,
  UpdateCountRequest,
  UpdateCountResponse,
} from './types';

@Controller('shopping-cart')
export class ShoppingCardController {
  constructor(private readonly shoppingCardService: ShoppingCardService) {}

  @ApiOkResponse({ type: [GetAllResponse] })
  @UseGuards(AuthenticatedGuard)
  @Get('/:id')
  getAll(@Param('id') userId: number) {
    return this.shoppingCardService.findAll(userId);
  }

  @ApiOkResponse({ type: OrderResponse })
  @ApiBody({ type: OrderRequest })
  @UseGuards(AuthenticatedGuard)
  @Patch('/admin/order/:id')
  order(
    @Body() order: number,
    @Param('id') userId: number,
  ) {
    return this.shoppingCardService.order(order, userId);
  }

  // @ApiOkResponse({ type: StatusResponse })
  // @ApiBody({ type: StatusRequest })
  // @UseGuards(AuthenticatedGuard)
  // @Patch('/admin/status/:id')
  // status(
  //   @Body() cardAdminDto: CardAdminDto,
  //   @Param('id') order: number,
  // ) {
  //   return this.shoppingCardService.orderStatus(order, cardAdminDto);
  // }

  @ApiOkResponse({ type: AddToCardResponse })
  @UseGuards(AuthenticatedGuard)
  @Post('/add')
  getToCard(@Body() addToCardDto: AddToCardDto) {
    return this.shoppingCardService.add(addToCardDto);
  }

  @ApiOkResponse({ type: UpdateCountResponse })
  @ApiBody({ type: UpdateCountRequest })
  @UseGuards(AuthenticatedGuard)
  @Patch('/count/:id')
  updateCount(
    @Body() { count }: { count: number },
    @Param('id') partId: number,
  ) {
    return this.shoppingCardService.updateCount(count, partId);
  }

  @ApiOkResponse({ type: TotalPriceResponse })
  @ApiBody({ type: TotalPriceRequest })
  @UseGuards(AuthenticatedGuard)
  @Patch('/total-price/:id')
  updateTotalPrice(
    @Body() { total_price }: { total_price: number },
    @Param('id') partId: number,
  ) {
    return this.shoppingCardService.updateTotalPrice(total_price, partId);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/one/:id')
  removeOne(@Param('id') partId: number) {
    return this.shoppingCardService.remove(partId);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/all/:id')
  removeAll(@Param('id') userId: number) {
    return this.shoppingCardService.removeAll(userId);
  }
}
