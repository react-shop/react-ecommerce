import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CartService } from '../cart.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('CartService', () => {
  let service: CartService;
  let prismaService: PrismaService;

  const mockUserId = 'user-123';
  const mockCartId = 'cart-123';
  const mockProductId = 'product-123';
  const mockVariantId = 'variant-123';

  const mockProduct = {
    id: mockProductId,
    name: 'Test Product',
    price: 100,
    images: [{ id: 'img-1', url: 'https://example.com/image.jpg', isPrimary: true }],
    categories: [
      {
        id: 'pc-1',
        isPrimary: true,
        category: { id: 'cat-1', name: 'Electronics', slug: 'electronics' },
      },
    ],
  };

  const mockCart = {
    id: mockCartId,
    userId: mockUserId,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        id: 'item-1',
        cartId: mockCartId,
        productId: mockProductId,
        variantId: null,
        quantity: 2,
        product: mockProduct,
        variant: null,
      },
    ],
  };

  const mockPrismaService = {
    cart: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    product: {
      findUnique: jest.fn(),
    },
    productVariant: {
      findUnique: jest.fn(),
    },
    cartItem: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    prismaService = module.get<PrismaService>(PrismaService);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCart', () => {
    it('should return existing cart', async () => {
      mockPrismaService.cart.findUnique.mockResolvedValue(mockCart);

      const result = await service.getCart(mockUserId);

      expect(result).toBeDefined();
      expect(result.id).toBe(mockCartId);
      expect(result.subtotal).toBe(200); // 2 items * $100
      expect(result.itemCount).toBe(2);
      expect(mockPrismaService.cart.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        include: expect.any(Object),
      });
    });

    it('should create new cart if not exists', async () => {
      const newCart = { ...mockCart, items: [] };
      mockPrismaService.cart.findUnique.mockResolvedValue(null);
      mockPrismaService.cart.create.mockResolvedValue(newCart);

      const result = await service.getCart(mockUserId);

      expect(result).toBeDefined();
      expect(result.items).toEqual([]);
      expect(result.subtotal).toBe(0);
      expect(result.itemCount).toBe(0);
      expect(mockPrismaService.cart.create).toHaveBeenCalledWith({
        data: { userId: mockUserId },
        include: expect.any(Object),
      });
    });

    it('should calculate cart totals correctly', async () => {
      const cartWithMultipleItems = {
        ...mockCart,
        items: [
          {
            id: 'item-1',
            product: { ...mockProduct, price: 50 },
            variant: null,
            quantity: 2,
          },
          {
            id: 'item-2',
            product: { ...mockProduct, price: 30 },
            variant: null,
            quantity: 3,
          },
        ],
      };

      mockPrismaService.cart.findUnique.mockResolvedValue(cartWithMultipleItems);

      const result = await service.getCart(mockUserId);

      expect(result.subtotal).toBe(190); // (2 * $50) + (3 * $30)
      expect(result.itemCount).toBe(5); // 2 + 3
    });

    it('should use variant price if variant exists', async () => {
      const cartWithVariant = {
        ...mockCart,
        items: [
          {
            id: 'item-1',
            product: { ...mockProduct, price: 100 },
            variant: { id: 'var-1', price: 150 },
            quantity: 1,
          },
        ],
      };

      mockPrismaService.cart.findUnique.mockResolvedValue(cartWithVariant);

      const result = await service.getCart(mockUserId);

      expect(result.subtotal).toBe(150); // Should use variant price
    });
  });

  describe('addToCart', () => {
    beforeEach(() => {
      mockPrismaService.cart.findUnique.mockResolvedValue(mockCart);
      mockPrismaService.product.findUnique.mockResolvedValue(mockProduct);
    });

    it('should add new product to cart', async () => {
      mockPrismaService.cartItem.findFirst.mockResolvedValue(null);
      mockPrismaService.cartItem.create.mockResolvedValue({});

      await service.addToCart(mockUserId, mockProductId, null, 1);

      expect(mockPrismaService.product.findUnique).toHaveBeenCalledWith({
        where: { id: mockProductId },
      });
      expect(mockPrismaService.cartItem.create).toHaveBeenCalledWith({
        data: {
          cartId: mockCartId,
          productId: mockProductId,
          variantId: null,
          quantity: 1,
        },
      });
    });

    it('should update quantity if product already in cart', async () => {
      const existingItem = {
        id: 'item-1',
        cartId: mockCartId,
        productId: mockProductId,
        quantity: 2,
      };

      mockPrismaService.cartItem.findFirst.mockResolvedValue(existingItem);
      mockPrismaService.cartItem.update.mockResolvedValue({});

      await service.addToCart(mockUserId, mockProductId, null, 3);

      expect(mockPrismaService.cartItem.update).toHaveBeenCalledWith({
        where: { id: 'item-1' },
        data: { quantity: 5 }, // 2 + 3
      });
    });

    it('should throw NotFoundException if product not found', async () => {
      mockPrismaService.product.findUnique.mockResolvedValue(null);

      await expect(
        service.addToCart(mockUserId, mockProductId, null, 1),
      ).rejects.toThrow(NotFoundException);
    });

    it('should handle variant products', async () => {
      const mockVariant = { id: mockVariantId, productId: mockProductId, price: 120 };
      mockPrismaService.productVariant.findUnique.mockResolvedValue(mockVariant);
      mockPrismaService.cartItem.findFirst.mockResolvedValue(null);
      mockPrismaService.cartItem.create.mockResolvedValue({});

      await service.addToCart(mockUserId, mockProductId, mockVariantId, 1);

      expect(mockPrismaService.productVariant.findUnique).toHaveBeenCalledWith({
        where: { id: mockVariantId },
      });
      expect(mockPrismaService.cartItem.create).toHaveBeenCalledWith({
        data: {
          cartId: mockCartId,
          productId: mockProductId,
          variantId: mockVariantId,
          quantity: 1,
        },
      });
    });

    it('should throw NotFoundException if variant not found', async () => {
      mockPrismaService.productVariant.findUnique.mockResolvedValue(null);

      await expect(
        service.addToCart(mockUserId, mockProductId, mockVariantId, 1),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateCartItem', () => {
    beforeEach(() => {
      mockPrismaService.cart.findUnique.mockResolvedValue(mockCart);
    });

    it('should update item quantity', async () => {
      const mockItem = { id: 'item-1', cartId: mockCartId, quantity: 2 };
      mockPrismaService.cartItem.findFirst.mockResolvedValue(mockItem);
      mockPrismaService.cartItem.update.mockResolvedValue({});

      await service.updateCartItem(mockUserId, 'item-1', 5);

      expect(mockPrismaService.cartItem.update).toHaveBeenCalledWith({
        where: { id: 'item-1' },
        data: { quantity: 5 },
      });
    });

    it('should delete item if quantity is zero or less', async () => {
      const mockItem = { id: 'item-1', cartId: mockCartId, quantity: 2 };
      mockPrismaService.cartItem.findFirst.mockResolvedValue(mockItem);
      mockPrismaService.cartItem.delete.mockResolvedValue({});

      await service.updateCartItem(mockUserId, 'item-1', 0);

      expect(mockPrismaService.cartItem.delete).toHaveBeenCalledWith({
        where: { id: 'item-1' },
      });
    });

    it('should throw NotFoundException if item not found', async () => {
      mockPrismaService.cartItem.findFirst.mockResolvedValue(null);

      await expect(
        service.updateCartItem(mockUserId, 'item-1', 5),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeFromCart', () => {
    beforeEach(() => {
      mockPrismaService.cart.findUnique.mockResolvedValue(mockCart);
    });

    it('should remove item from cart', async () => {
      const mockItem = { id: 'item-1', cartId: mockCartId };
      mockPrismaService.cartItem.findFirst.mockResolvedValue(mockItem);
      mockPrismaService.cartItem.delete.mockResolvedValue({});

      await service.removeFromCart(mockUserId, 'item-1');

      expect(mockPrismaService.cartItem.delete).toHaveBeenCalledWith({
        where: { id: 'item-1' },
      });
    });

    it('should throw NotFoundException if item not found', async () => {
      mockPrismaService.cartItem.findFirst.mockResolvedValue(null);

      await expect(
        service.removeFromCart(mockUserId, 'item-1'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('clearCart', () => {
    it('should delete all items from cart', async () => {
      mockPrismaService.cart.findUnique.mockResolvedValue(mockCart);
      mockPrismaService.cartItem.deleteMany.mockResolvedValue({ count: 2 });

      await service.clearCart(mockUserId);

      expect(mockPrismaService.cartItem.deleteMany).toHaveBeenCalledWith({
        where: { cartId: mockCartId },
      });
    });
  });
});

