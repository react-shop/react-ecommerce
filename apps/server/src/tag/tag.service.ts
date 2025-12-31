import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Tag } from '@prisma/client';
import { Helpers } from '../utils/helpers';

@Injectable()
export class TagService {
  constructor(
    private prisma: PrismaService,
    private helpers: Helpers,
  ) {}

  async create(name: string): Promise<Tag> {
    const slug = this.helpers.slugify(name);

    const existingTag = await this.prisma.tag.findUnique({ where: { slug } });
    if (existingTag) {
      throw new HttpException('Tag with this name already exists', HttpStatus.CONFLICT);
    }

    return this.prisma.tag.create({
      data: {
        name,
        slug,
      },
    });
  }

  async findAll(): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id?: string, slug?: string): Promise<Tag | null> {
    if (!id && !slug) {
      throw new HttpException('Either ID or slug must be provided', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.tag.findUnique({
      where: { id, slug },
      include: {
        products: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
          },
        },
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async update(id: string, name: string): Promise<Tag> {
    const tag = await this.prisma.tag.findUnique({ where: { id } });

    if (!tag) {
      throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
    }

    const slug = this.helpers.slugify(name);

    const existingTagWithSlug = await this.prisma.tag.findUnique({ where: { slug } });
    if (existingTagWithSlug && existingTagWithSlug.id !== id) {
      throw new HttpException('Tag with this slug already exists', HttpStatus.CONFLICT);
    }

    return this.prisma.tag.update({
      where: { id },
      data: {
        name,
        slug,
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    const tag = await this.prisma.tag.findUnique({ where: { id } });
    if (!tag) {
      throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.tag.delete({ where: { id } });
    return true;
  }
}

