import { Test, TestingModule } from '@nestjs/testing';
import { CartResolver } from '../cart.resolver';
import { CartService } from '../cart.service';
import { JwtAuthGuard } from '../../auth/auth.guard';

describe('CartResolver', () => {
  let resolver: CartResolver;
  let cartService: CartService;

  const mockUserId = 'user-123';
  const mockUser = {
    id: mockUserId,
    email: 'test@example.com',
    role: 'CUSTOMER',
  };

  const mockCartData = {
    id: 'cart-123',
    userId: mockUserId,
    items: [
      {
        id: 'item-1',
        product: {
          id: 'product-1',
          name: 'Test Product',
          price: 100,
        },
        quantity: 2,
      },
    ],
    subtotal: 200,
    total: 200,
    itemCount: 2,
  };

  const mockCartService = {
    getCart: jest.fn(),
    addToCart: jest.fn(),
    updateCartItem: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartResolver,
        {
          provide: CartService,
          useValue: mockCartService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    resolver = module.get<CartResolver>(CartResolver);
    cartService = module.get<CartService>(CartService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getCart', () => {
    it('should return user cart', async () => {
      mockCartService.getCart.mockResolvedValue(mockCartData);

      const result = await resolver.getCart(mockUser);

      expect(result).toEqual(mockCartData);
      expect(mockCartService.getCart).toHaveBeenCalledWith(mockUserId);
    });

    it('should handle empty cart', async () => {
      const emptyCart = {
        ...mockCartData,
        items: [],
        subtotal: 0,
        total: 0,
        itemCount: 0,
      };

      mockCartService.getCart.mockResolvedValue(emptyCart);

      const result = await resolver.getCart(mockUser);

      expect(result.items).toEqual([]);
      expect(result.subtotal).toBe(0);
    });
  });

  describe('addToCart', () => {
    it('should add product to cart', async () => {
      const productId = 'product-1';
      const quantity = 2;

      mockCartService.addToCart.mockResolvedValue(mockCartData);

      const result = await resolver.addToCart(mockUser, productId, null, quantity);

      expect(result).toEqual(mockCartData);
      expect(mockCartService.addToCart).toHaveBeenCalledWith(
        mockUserId,
        productId,
        null,
        quantity,
      );
    });

    it('should add product variant to cart', async () => {
      const productId = 'product-1';
      const variantId = 'variant-1';
      const quantity = 1;

      mockCartService.addToCart.mockResolvedValue(mockCartData);

      const result = await resolver.addToCart(mockUser, productId, variantId, quantity);

      expect(result).toEqual(mockCartData);
      expect(mockCartService.addToCart).toHaveBeenCalledWith(
        mockUserId,
        productId,
        variantId,
        quantity,
      );
    });
  });

  describe('updateCartItem', () => {
    it('should update item quantity', async () => {
      const itemId = 'item-1';
      const quantity = 5;

      mockCartService.updateCartItem.mockResolvedValue(mockCartData);

      const result = await resolver.updateCartItem(mockUser, itemId, quantity);

      expect(result).toEqual(mockCartData);
      expect(mockCartService.updateCartItem).toHaveBeenCalledWith(
        mockUserId,
        itemId,
        quantity,
      );
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', async () => {
      const itemId = 'item-1';
      const updatedCart = { ...mockCartData, items: [] };

      mockCartService.removeFromCart.mockResolvedValue(updatedCart);

      const result = await resolver.removeFromCart(mockUser, itemId);

      expect(result).toEqual(updatedCart);
      expect(mockCartService.removeFromCart).toHaveBeenCalledWith(mockUserId, itemId);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', async () => {
      const emptyCart = {
        ...mockCartData,
        items: [],
        subtotal: 0,
        total: 0,
        itemCount: 0,
      };

      mockCartService.clearCart.mockResolvedValue(emptyCart);

      const result = await resolver.clearCart(mockUser);

      expect(result).toEqual(emptyCart);
      expect(mockCartService.clearCart).toHaveBeenCalledWith(mockUserId);
    });
  });
});

