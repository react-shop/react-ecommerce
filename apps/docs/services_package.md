# Services Package

Type-safe React Query hooks for interacting with the GraphQL API.

## Overview

- **Package**: `@react-shop/services`
- **Data Fetching**: React Query (TanStack Query)
- **API**: GraphQL with graphql-request
- **Type Safety**: Full TypeScript support
- **Organization**: Feature-based structure

## Installation

```bash
yarn add @react-shop/services
```

## Setup

### 1. Initialize Client

```typescript
// app/layout.tsx (Next.js App Router)
import { QueryClientProvider, initializeClient, queryClient } from '@react-shop/services';

// Initialize GraphQL client
initializeClient('http://localhost:3001/graphql');

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

### 2. Token Management

```typescript
import { updateClientToken } from '@react-shop/services';

// After login
updateClientToken(accessToken);

// After logout
updateClientToken(null);
```

## Feature Structure

The services are organized by domain:

```
src/features/
├── auth/
│   ├── queries.ts      → useMe()
│   ├── mutations.ts    → useLogin(), useRegister(), useLogout()
│   └── index.ts
├── products/
│   ├── queries.ts      → useListProducts(), useProduct()
│   ├── mutations.ts    → useCreateProduct(), useUpdateProduct()
│   └── index.ts
├── cart/
│   ├── queries.ts      → useCart()
│   ├── mutations.ts    → useAddToCart(), useUpdateCartItem()
│   └── index.ts
└── index.ts
```

## Authentication

### useMe

Get the current authenticated user:

```typescript
import { useMe } from '@react-shop/services';

function UserProfile() {
  const { data, isLoading, error } = useMe();

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;

  return (
    <div>
      <h1>Welcome, {data.me.firstName}!</h1>
      <p>Email: {data.me.email}</p>
      <p>Role: {data.me.role}</p>
    </div>
  );
}
```

### useLogin

Login with email and password:

```typescript
import { useLogin, updateClientToken } from '@react-shop/services';

function LoginForm() {
  const { mutate: login, isPending, error } = useLogin({
    onSuccess: (data) => {
      // Update client token
      updateClientToken(data.login.accessToken);
      
      // Store refresh token
      localStorage.setItem('refreshToken', data.login.refreshToken);
      
      // Redirect
      router.push('/dashboard');
    },
    onError: (error) => {
      toast.error('Login failed: ' + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </Button>
      {error && <Error message={error.message} />}
    </form>
  );
}
```

### useRegister

Register a new user:

```typescript
import { useRegister } from '@react-shop/services';

function RegisterForm() {
  const { mutate: register, isPending } = useRegister({
    onSuccess: (data) => {
      updateClientToken(data.register.accessToken);
      router.push('/');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      input: {
        email,
        password,
        firstName,
        lastName,
      },
    });
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

### useLogout

Logout the current user:

```typescript
import { useLogout } from '@react-shop/services';

function LogoutButton() {
  const { mutate: logout } = useLogout({
    onSuccess: () => {
      updateClientToken(null);
      localStorage.removeItem('refreshToken');
      router.push('/login');
    },
  });

  return <Button onClick={() => logout()}>Logout</Button>;
}
```

## Products

### useListProducts

Fetch a list of products with filters:

```typescript
import { useListProducts } from '@react-shop/services';

function ProductList() {
  const { data, isLoading, error } = useListProducts({
    take: 12,
    where: {
      status: 'ACTIVE',
      categoryId: 'category-id',
      priceMin: 10,
      priceMax: 100,
    },
    orderBy: {
      field: 'createdAt',
      direction: 'desc',
    },
  });

  if (isLoading) return <ProductListSkeleton />;
  if (error) return <Error />;

  return (
    <Grid gridTemplateColumns="repeat(3, 1fr)" gap="4">
      {data.products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>
  );
}
```

### useInfiniteProducts

Infinite scroll product listing:

```typescript
import { useInfiniteProducts } from '@react-shop/services';

function InfiniteProductList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteProducts({
    take: 12,
    where: { status: 'ACTIVE' },
  });

  if (isLoading) return <Spinner />;

  return (
    <div>
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </React.Fragment>
      ))}

      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </div>
  );
}
```

### useProduct

Get a single product by ID or slug:

```typescript
import { useProduct } from '@react-shop/services';

function ProductDetail({ slug }: { slug: string }) {
  const { data, isLoading } = useProduct({ slug });

  if (isLoading) return <ProductDetailSkeleton />;

  const product = data.product;

  return (
    <div>
      <Heading>{product.name}</Heading>
      <PriceDisplay price={product.price} />
      <Text>{product.description}</Text>
      
      {/* Variants */}
      {product.variants?.map((variant) => (
        <VariantSelector key={variant.id} variant={variant} />
      ))}

      {/* Reviews */}
      <Rating rating={product.averageRating} reviewCount={product.reviewCount} />
      
      <Button onClick={() => addToCart(product.id)}>
        Add to Cart
      </Button>
    </div>
  );
}
```

### useSearchProducts

Search products:

```typescript
import { useSearchProducts } from '@react-shop/services';

function SearchResults() {
  const [query, setQuery] = useState('');
  const { data, isLoading } = useSearchProducts({ query, take: 10 });

  return (
    <div>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      {isLoading && <Spinner />}
      {data?.searchProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
```

## Shopping Cart

### useCart

Get the current user's cart:

```typescript
import { useCart } from '@react-shop/services';

function ShoppingCart() {
  const { data, isLoading } = useCart();

  if (isLoading) return <Spinner />;

  const cart = data.cart;

  return (
    <div>
      <Heading>Cart ({cart.itemCount} items)</Heading>
      
      {cart.items.map((item) => (
        <CartItemRow key={item.id} item={item} />
      ))}

      <Text>Subtotal: ${cart.subtotal}</Text>
      <Text>Total: ${cart.total}</Text>
      
      <Button>Checkout</Button>
    </div>
  );
}
```

### useAddToCart

Add an item to cart:

```typescript
import { useAddToCart } from '@react-shop/services';

function AddToCartButton({ productId, variantId }: Props) {
  const { mutate: addToCart, isPending } = useAddToCart({
    onSuccess: () => {
      toast.success('Added to cart!');
    },
  });

  return (
    <Button
      onClick={() => addToCart({ productId, variantId, quantity: 1 })}
      disabled={isPending}
    >
      {isPending ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
}
```

### useUpdateCartItem

Update item quantity:

```typescript
import { useUpdateCartItem } from '@react-shop/services';

function CartItemQuantity({ itemId, currentQuantity }: Props) {
  const { mutate: updateQuantity } = useUpdateCartItem();

  const handleChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity({ itemId, quantity: newQuantity });
    }
  };

  return (
    <Input
      type="number"
      value={currentQuantity}
      onChange={(e) => handleChange(parseInt(e.target.value))}
      min="1"
    />
  );
}
```

### useRemoveFromCart

Remove an item from cart:

```typescript
import { useRemoveFromCart } from '@react-shop/services';

function RemoveButton({ itemId }: Props) {
  const { mutate: removeItem } = useRemoveFromCart();

  return (
    <Button onClick={() => removeItem({ itemId })}>
      Remove
    </Button>
  );
}
```

### useClearCart

Clear the entire cart:

```typescript
import { useClearCart } from '@react-shop/services';

function ClearCartButton() {
  const { mutate: clearCart } = useClearCart({
    onSuccess: () => {
      toast.success('Cart cleared');
    },
  });

  return <Button onClick={() => clearCart()}>Clear Cart</Button>;
}
```

## Advanced Patterns

### Optimistic Updates

Update UI immediately before server response:

```typescript
import { useQueryClient, useAddToCart } from '@react-shop/services';

function OptimisticAddToCart({ productId }: Props) {
  const queryClient = useQueryClient();
  
  const { mutate } = useAddToCart({
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['cart'] });

      // Snapshot previous value
      const previousCart = queryClient.getQueryData(['cart']);

      // Optimistically update
      queryClient.setQueryData(['cart'], (old: any) => ({
        ...old,
        cart: {
          ...old.cart,
          itemCount: old.cart.itemCount + variables.quantity,
        },
      }));

      // Return context for rollback
      return { previousCart };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousCart) {
        queryClient.setQueryData(['cart'], context.previousCart);
      }
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return <Button onClick={() => mutate({ productId, quantity: 1 })}>Add</Button>;
}
```

### Conditional Queries

Only run query when conditions are met:

```typescript
const { data } = useProduct(
  { slug },
  {
    enabled: !!slug, // Only run if slug exists
  }
);
```

### Custom Configuration

```typescript
const { data } = useListProducts(
  { take: 10 },
  {
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    retry: 3,
  }
);
```

### Dependent Queries

```typescript
function ProductWithReviews({ productId }: Props) {
  // First, get the product
  const { data: productData } = useProduct({ id: productId });
  
  // Then, get reviews (only runs after product is loaded)
  const { data: reviewsData } = useReviews(
    { productId },
    {
      enabled: !!productData, // Wait for product
    }
  );
}
```

## TypeScript

All hooks are fully typed:

```typescript
import type {
  Product,
  Cart,
  User,
  CreateProductInput,
  UpdateProductInput,
} from '@react-shop/services';

// Types are automatically inferred
const { data } = useProduct({ slug: 'test' });
// data is { product: Product } | undefined
```

## Error Handling

```typescript
const { data, error, isError } = useListProducts();

if (isError) {
  // Error is typed
  console.error(error.message);
  
  return <ErrorBoundary error={error} />;
}
```

## Cache Management

```typescript
import { useQueryClient } from '@react-shop/services';

function CacheExample() {
  const queryClient = useQueryClient();

  // Invalidate queries
  queryClient.invalidateQueries({ queryKey: ['products'] });

  // Remove queries
  queryClient.removeQueries({ queryKey: ['products', 'detail'] });

  // Get cached data
  const cachedCart = queryClient.getQueryData(['cart']);

  // Set cache data
  queryClient.setQueryData(['cart'], newCartData);

  // Clear all cache
  queryClient.clear();
}
```

## Next Steps

- [Product Management](./products.md) - Working with products
- [Cart System](./cart.md) - Cart implementation
- [Adding Features](./adding_features.md) - Extend the API

