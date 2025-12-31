import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { JwtAuthGuard } from '../auth/auth.guard';

@Resolver('Tag')
export class TagResolver {
  constructor(private tagService: TagService) {}

  @Query('tags')
  async getTags() {
    return this.tagService.findAll();
  }

  @Query('tag')
  async getTag(
    @Args('id') id?: string,
    @Args('slug') slug?: string,
  ) {
    return this.tagService.findOne(id, slug);
  }

  @Mutation('createTag')
  @UseGuards(JwtAuthGuard)
  async createTag(@Args('name') name: string) {
    return this.tagService.create(name);
  }

  @Mutation('updateTag')
  @UseGuards(JwtAuthGuard)
  async updateTag(
    @Args('id') id: string,
    @Args('name') name: string,
  ) {
    return this.tagService.update(id, name);
  }

  @Mutation('deleteTag')
  @UseGuards(JwtAuthGuard)
  async deleteTag(@Args('id') id: string) {
    return this.tagService.delete(id);
  }
}

