import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../user/user.decorator';
import { ReviewStatus } from '@prisma/client';

@Resolver('Review')
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}

  @Query('reviews')
  async getReviews(
    @Args('productId') productId: string,
    @Args('skip') skip?: number,
    @Args('take') take?: number,
  ) {
    return this.reviewService.getReviews(productId, skip, take);
  }

  @Mutation('createReview')
  @UseGuards(JwtAuthGuard)
  async createReview(@CurrentUser() user: any, @Args('input') input: any) {
    return this.reviewService.createReview(user.id, input.productId, input.rating, input.comment);
  }

  @Mutation('updateReview')
  @UseGuards(JwtAuthGuard)
  async updateReview(
    @CurrentUser() user: any,
    @Args('id') id: string,
    @Args('input') input: any,
  ) {
    return this.reviewService.updateReview(user.id, id, input.rating, input.comment);
  }

  @Mutation('deleteReview')
  @UseGuards(JwtAuthGuard)
  async deleteReview(@CurrentUser() user: any, @Args('id') id: string) {
    return this.reviewService.deleteReview(user.id, id);
  }

  @Mutation('moderateReview')
  @UseGuards(JwtAuthGuard)
  async moderateReview(@Args('id') id: string, @Args('status') status: ReviewStatus) {
    return this.reviewService.moderateReview(id, status);
  }
}

