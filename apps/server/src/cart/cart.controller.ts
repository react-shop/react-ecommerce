import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';

import { CartService } from '@cart/cart.service';
import { JwtAuthGuard } from '@auth/auth.guard';
import { CurrentUser } from '@user/user.decorator';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCart(@CurrentUser() user: any): Promise<any> {
    return await this.cartService.getCart(user.id);
  }

  @Post('items')
  @UseGuards(JwtAuthGuard)
  async addToCart(
    @CurrentUser() user: any,
    @Body() data: { productId: string; variantId?: string; quantity: number },
  ): Promise<any> {
    return await this.cartService.addToCart(user.id, data.productId, data.variantId || null, data.quantity);
  }

  @Put('items/:itemId')
  @UseGuards(JwtAuthGuard)
  async updateCartItem(
    @CurrentUser() user: any,
    @Param('itemId') itemId: string,
    @Body() data: { quantity: number },
  ): Promise<any> {
    return await this.cartService.updateCartItem(user.id, itemId, data.quantity);
  }

  @Delete('items/:itemId')
  @UseGuards(JwtAuthGuard)
  async removeFromCart(@CurrentUser() user: any, @Param('itemId') itemId: string): Promise<void> {
    await this.cartService.removeFromCart(user.id, itemId);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async clearCart(@CurrentUser() user: any): Promise<void> {
    await this.cartService.clearCart(user.id);
  }
}

