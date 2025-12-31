"use client";

import {
  Container,
  Heading,
  Text,
  Button,
  Grid,
  Card,
  Badge,
  Skeleton,
  ProductCard,
  Flex,
  Stack,
} from "@react-shop/design-system";
import { useProducts } from "@react-shop/sdk";

export default function HomePage() {
  const { data: products, isLoading, error } = useProducts();

  return (
    <Container>
      {/* Hero Section */}
      <div className="py-16 text-center">
        <Badge variant="subtle">New Arrivals</Badge>
        <Heading as="h1" size="6xl" className="my-4">
          Welcome to React Ecommerce
        </Heading>
        <Text size="xl" color="secondary" className="mb-8">
          Discover the best products at unbeatable prices
        </Text>
        <Button size="lg" variant="solid">
          Shop Now
        </Button>
      </div>

      {/* Products Section */}
      <div className="py-16">
        <Heading as="h2" size="3xl" className="mb-8">
          Featured Products
        </Heading>

        {error && (
          <Card variant="outline">
            <Text color="error">
              Error loading products:{" "}
              {error instanceof Error ? error.message : "Unknown error"}
            </Text>
          </Card>
        )}

        {isLoading && (
          <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <Skeleton
                  variant="rectangular"
                  className="h-[200px] mb-4"
                />
                <Skeleton variant="text" className="mb-2" />
                <Skeleton variant="text" className="w-3/5" />
              </Card>
            ))}
          </Grid>
        )}

        {products && products.length > 0 && (
          <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                image={product.images?.[0]?.url || "/placeholder-product.jpg"}
                rating={0}
              />
            ))}
          </Grid>
        )}

        {products && products.length === 0 && (
          <Card variant="outline">
            <Text>No products available yet.</Text>
          </Card>
        )}
      </div>

      {/* Test Design System Components */}
      <div className="py-16 border-t border-gray-200">
        <Heading as="h2" size="2xl" className="mb-8">
          Design System Test
        </Heading>

        <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <Heading as="h3" size="lg">
              Buttons
            </Heading>
            <Flex className="gap-4 mt-4 flex-wrap">
              <Button variant="solid">Solid</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </Flex>
          </Card>

          <Card>
            <Heading as="h3" size="lg">
              Badges
            </Heading>
            <Flex className="gap-4 mt-4 flex-wrap">
              <Badge variant="solid">Solid</Badge>
              <Badge variant="subtle">Subtle</Badge>
              <Badge variant="outline">Outline</Badge>
            </Flex>
          </Card>

          <Card>
            <Heading as="h3" size="lg">
              Typography
            </Heading>
            <Stack className="mt-4">
              <Text size="sm">Small text</Text>
              <Text size="md">Medium text</Text>
              <Text size="lg">Large text</Text>
            </Stack>
          </Card>
        </Grid>
      </div>
    </Container>
  );
}

