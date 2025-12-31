import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../user/user.decorator';

@Resolver('Cart')
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query('cart')
  @UseGuards(JwtAuthGuard)
  async getCart(@CurrentUser() user: any) {
    return this.cartService.getCart(user.id);
  }

  @Mutation('addToCart')
  @UseGuards(JwtAuthGuard)
  async addToCart(
    @CurrentUser() user: any,
    @Args('productId') productId: string,
    @Args('variantId') variantId: string | null,
    @Args('quantity') quantity: number,
  ) {
    return this.cartService.addToCart(user.id, productId, variantId, quantity);
  }

  @Mutation('updateCartItem')
  @UseGuards(JwtAuthGuard)
  async updateCartItem(
    @CurrentUser() user: any,
    @Args('itemId') itemId: string,
    @Args('quantity') quantity: number,
  ) {
    return this.cartService.updateCartItem(user.id, itemId, quantity);
  }

  @Mutation('removeFromCart')
  @UseGuards(JwtAuthGuard)
  async removeFromCart(@CurrentUser() user: any, @Args('itemId') itemId: string) {
    return this.cartService.removeFromCart(user.id, itemId);
  }

  @Mutation('clearCart')
  @UseGuards(JwtAuthGuard)
  async clearCart(@CurrentUser() user: any) {
    return this.cartService.clearCart(user.id);
  }
}

