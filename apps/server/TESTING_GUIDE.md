# Backend Testing Guide

**Last Updated:** December 31, 2025  
**Status:** 🧪 Testing Infrastructure Setup Complete

---

## 📋 Overview

This guide covers the testing strategy, tools, and patterns for the React Ecommerce backend.

---

## 🎯 Testing Strategy

### **Test Types**

1. **Unit Tests** (`*.spec.ts`)
   - Test individual services in isolation
   - Mock all dependencies (Prisma, other services)
   - Fast execution
   - High code coverage target (>80%)

2. **Integration Tests** (`*.spec.ts` for resolvers)
   - Test GraphQL resolvers with mocked services
   - Test authentication/authorization
   - Verify request/response flow

3. **E2E Tests** (`*.e2e-spec.ts`)
   - Test complete user flows
   - Use test database
   - Slower but comprehensive

---

## 🛠️ Testing Tools

```json
{
  "jest": "^29.7.0",           // Test runner
  "ts-jest": "^29.1.0",        // TypeScript support
  "@nestjs/testing": "^10.0.0", // NestJS testing utilities
  "supertest": "^7.1.3"        // HTTP testing
}
```

---

## 📁 Test Structure

```
apps/server/
├── src/
│   ├── cart/
│   │   ├── __tests__/
│   │   │   ├── cart.service.spec.ts     # Unit tests
│   │   │   └── cart.resolver.spec.ts    # Integration tests
│   │   ├── cart.service.ts
│   │   ├── cart.resolver.ts
│   │   └── cart.module.ts
│   ├── review/
│   │   ├── __tests__/
│   │   │   ├── review.service.spec.ts
│   │   │   └── review.resolver.spec.ts
│   │   └── ...
│   └── ...
└── test/
    ├── utils/
    │   └── test-helpers.ts              # Shared test utilities
    ├── app.e2e-spec.ts                  # E2E tests
    └── jest-e2e.json                    # E2E Jest config
```

---

## 🧪 Writing Unit Tests

### **Pattern: Service Unit Test**

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MyService } from '../my.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('MyService', () => {
  let service: MyService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    myModel: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<MyService>(MyService);
    prismaService = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('methodName', () => {
    it('should return expected result', async () => {
      // Arrange
      mockPrismaService.myModel.findUnique.mockResolvedValue({ id: '1', name: 'Test' });

      // Act
      const result = await service.methodName('1');

      // Assert
      expect(result).toEqual({ id: '1', name: 'Test' });
      expect(mockPrismaService.myModel.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw error if not found', async () => {
      mockPrismaService.myModel.findUnique.mockResolvedValue(null);

      await expect(service.methodName('999')).rejects.toThrow();
    });
  });
});
```

### **Pattern: Resolver Integration Test**

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { MyResolver } from '../my.resolver';
import { MyService } from '../my.service';
import { JwtAuthGuard } from '../../auth/auth.guard';

describe('MyResolver', () => {
  let resolver: MyResolver;
  let service: MyService;

  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    role: 'CUSTOMER',
  };

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyResolver,
        {
          provide: MyService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    resolver = module.get<MyResolver>(MyResolver);
    service = module.get<MyService>(MyService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('query', () => {
    it('should return items for authenticated user', async () => {
      const mockData = [{ id: '1', name: 'Item 1' }];
      mockService.findAll.mockResolvedValue(mockData);

      const result = await resolver.getItems(mockUser);

      expect(result).toEqual(mockData);
      expect(mockService.findAll).toHaveBeenCalledWith(mockUser.id);
    });
  });
});
```

---

## 🚀 Running Tests

### **Run All Tests**
```bash
cd apps/server
pnpm test
```

### **Run Tests in Watch Mode**
```bash
pnpm test:watch
```

### **Run Tests with Coverage**
```bash
pnpm test:cov
```

### **Run Specific Test File**
```bash
pnpm test -- cart.service.spec.ts
```

### **Run E2E Tests**
```bash
pnpm test:e2e
```

---

## 📊 Testing Checklist

### **Cart Service** ✅ 
- [x] Unit tests for service methods
- [x] Integration tests for resolver
- [ ] E2E tests for cart flow

### **Review Service** (To Do)
- [ ] Unit tests for service methods
- [ ] Integration tests for resolver
- [ ] Test helpful count increment
- [ ] Test admin responses

### **Order Service** (To Do)
- [ ] Unit tests for service methods
- [ ] Integration tests for resolver
- [ ] Test order number generation
- [ ] Test discount application
- [ ] Test payment integration
- [ ] Test shipment integration

### **Tag Module** (To Do)
- [ ] Unit tests for service methods
- [ ] Integration tests for resolver
- [ ] Test slug generation

### **Discount Module** (To Do)
- [ ] Unit tests for service methods
- [ ] Integration tests for resolver
- [ ] Test code validation
- [ ] Test expiration logic
- [ ] Test usage limits

### **Payment Module** (To Do)
- [ ] Unit tests for service methods
- [ ] Integration tests for resolver
- [ ] Test payment status updates
- [ ] Test refund logic

### **Shipment Module** (To Do)
- [ ] Unit tests for service methods
- [ ] Integration tests for resolver
- [ ] Test tracking updates
- [ ] Test status transitions

---

## 🎯 Test Coverage Goals

| Module | Target Coverage | Current | Status |
|--------|----------------|---------|--------|
| Cart | >80% | 0% | 🔴 Tests written, need to run |
| Review | >80% | 0% | ⏳ Pending |
| Order | >80% | 0% | ⏳ Pending |
| Tag | >80% | 0% | ⏳ Pending |
| Discount | >80% | 0% | ⏳ Pending |
| Payment | >80% | 0% | ⏳ Pending |
| Shipment | >80% | 0% | ⏳ Pending |
| **Overall** | **>75%** | **0%** | 🔴 |

---

## 🔧 Test Utilities

### **Mock Helpers**

Located in `test/utils/test-helpers.ts`:

```typescript
import { createMockUser, createMockProduct } from '../test/utils/test-helpers';

const user = createMockUser({ role: 'ADMIN' });
const product = createMockProduct({ price: 50 });
```

### **Available Mocks**

- `createMockPrismaService()` - Complete Prisma service mock
- `createMockUser(overrides?)` - Customer user
- `createMockAdminUser(overrides?)` - Admin user
- `createMockProduct(overrides?)` - Product
- `createMockCategory(overrides?)` - Category
- `createMockCart(overrides?)` - Cart
- `createMockOrder(overrides?)` - Order
- `createMockReview(overrides?)` - Review
- `createMockDiscount(overrides?)` - Discount
- `createMockPayment(overrides?)` - Payment
- `createMockShipment(overrides?)` - Shipment
- `createMockAddress(overrides?)` - Address

---

## 📝 Test Best Practices

### **1. Follow AAA Pattern**
```typescript
it('should do something', async () => {
  // Arrange - Set up test data and mocks
  const input = { name: 'Test' };
  mockService.create.mockResolvedValue({ id: '1', ...input });

  // Act - Execute the function
  const result = await service.create(input);

  // Assert - Verify the result
  expect(result).toEqual({ id: '1', ...input });
});
```

### **2. Clear Mocks Between Tests**
```typescript
beforeEach(() => {
  jest.clearAllMocks();
});
```

### **3. Test Edge Cases**
- Empty inputs
- Null/undefined values
- Invalid data
- Not found scenarios
- Authorization failures

### **4. Test Error Scenarios**
```typescript
it('should throw NotFoundException', async () => {
  mockService.findOne.mockResolvedValue(null);
  
  await expect(service.getSomething('999')).rejects.toThrow(NotFoundException);
});
```

### **5. Keep Tests Independent**
- Don't rely on test execution order
- Create fresh data for each test
- Don't share state between tests

---

## 🐛 Debugging Tests

### **Enable Debug Mode**
```bash
pnpm test:debug
```

### **Run Single Test**
```typescript
it.only('should test specific case', async () => {
  // This test will run alone
});
```

### **Skip Test Temporarily**
```typescript
it.skip('should test something', async () => {
  // This test will be skipped
});
```

---

## 📚 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

## 🎯 Next Steps

1. **Fix Jest Configuration** - Resolve `@jest/test-sequencer` issue
2. **Run Cart Tests** - Verify test suite works
3. **Create Tests for All Modules** - Follow Cart pattern
4. **Add E2E Tests** - Test complete user flows
5. **Setup CI/CD** - Run tests on every commit
6. **Achieve 80%+ Coverage** - High quality codebase

---

**Happy Testing!** 🧪✨

