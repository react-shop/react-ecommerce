import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    slug: string;
    description?: string;
    shortDesc?: string;
    price: number;
    sku?: string;
    status?: string;
    categoryIds?: string[];
    tagIds?: string[];
    images?: Array<{
      url: string;
      alt?: string;
      sortOrder?: number;
      isPrimary?: boolean;
    }>;
  }) {
    const { name, slug, categoryIds, tagIds, images, ...productData } = data;

    // Check if product with slug already exists
    const existingProduct = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      throw new HttpException(
        { message: 'Product with this slug already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Create product with relations
    const newProduct = await this.prisma.product.create({
      data: {
        name,
        slug,
        ...productData,
        status: (productData.status || 'DRAFT') as any,
        trackInventory: true,
        stock: 0,
        lowStockAlert: 5,
        // Create images if provided
        images: images
          ? {
              createMany: {
                data: images.map((img, index) => ({
                  url: img.url,
                  alt: img.alt,
                  sortOrder: img.sortOrder ?? index,
                  isPrimary: img.isPrimary ?? index === 0,
                })),
              },
            }
          : undefined,
        // Link categories if provided
        categories: categoryIds
          ? {
              createMany: {
                data: categoryIds.map((categoryId, index) => ({
                  categoryId,
                  isPrimary: index === 0,
                })),
              },
            }
          : undefined,
        // Link tags if provided
        tags: tagIds
          ? {
              createMany: {
                data: tagIds.map((tagId) => ({
                  tagId,
                })),
              },
            }
          : undefined,
      },
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        variants: true,
        reviews: true,
      },
    });

    return newProduct;
  }

  async findAll(skip = 0, take = 20, where?: any) {
    const products = await this.prisma.product.findMany({
      where,
      skip,
      take,
      include: {
        images: {
          orderBy: {
            sortOrder: 'asc',
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        variants: true,
        reviews: {
          where: {
            status: 'APPROVED',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: {
            sortOrder: 'asc',
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        variants: true,
        reviews: {
          where: {
            status: 'APPROVED',
          },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new HttpException(
        { message: 'Product not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: {
            sortOrder: 'asc',
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        variants: true,
        reviews: {
          where: {
            status: 'APPROVED',
          },
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new HttpException(
        { message: 'Product not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    return product;
  }

  async update(
    id: string,
    data: {
      name?: string;
      slug?: string;
      description?: string;
      shortDesc?: string;
      price?: number;
      sku?: string;
      status?: string;
      stock?: number;
      categoryIds?: string[];
      tagIds?: string[];
    },
  ) {
    const { categoryIds, tagIds, ...updateData } = data;

    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new HttpException(
        { message: 'Product not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    // Update product
    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        ...updateData,
        status: updateData.status as any,
      },
      include: {
        images: true,
        categories: {
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        variants: true,
      },
    });

    // Update categories if provided
    if (categoryIds) {
      // Remove old categories
      await this.prisma.productCategory.deleteMany({
        where: { productId: id },
      });

      // Add new categories
      await this.prisma.productCategory.createMany({
        data: categoryIds.map((categoryId, index) => ({
          productId: id,
          categoryId,
          isPrimary: index === 0,
        })),
      });
    }

    // Update tags if provided
    if (tagIds) {
      // Remove old tags
      await this.prisma.productTag.deleteMany({
        where: { productId: id },
      });

      // Add new tags
      await this.prisma.productTag.createMany({
        data: tagIds.map((tagId) => ({
          productId: id,
          tagId,
        })),
      });
    }

    return updatedProduct;
  }

  async delete(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new HttpException(
        { message: 'Product not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.prisma.product.delete({ where: { id } });

    return true;
  }

  async search(query: string, skip = 0, take = 20) {
    const products = await this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { sku: { contains: query, mode: 'insensitive' } },
        ],
        status: 'ACTIVE',
      },
      skip,
      take,
      include: {
        images: {
          where: {
            isPrimary: true,
          },
          take: 1,
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    return products;
  }
}
