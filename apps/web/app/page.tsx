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
} from "@react-shop/design-system";
import { useProducts } from "@react-shop/sdk";

export default function HomePage() {
  const { data: products, isLoading, error } = useProducts();

  return (
    <Container>
      {/* Hero Section */}
      <div style={{ padding: "4rem 0", textAlign: "center" }}>
        <Badge variant="subtle">New Arrivals</Badge>
        <Heading as="h1" size="6xl" style={{ margin: "1rem 0" }}>
          Welcome to React Ecommerce
        </Heading>
        <Text size="xl" color="secondary" style={{ marginBottom: "2rem" }}>
          Discover the best products at unbeatable prices
        </Text>
        <Button size="lg" variant="solid">
          Shop Now
        </Button>
      </div>

      {/* Products Section */}
      <div style={{ padding: "4rem 0" }}>
        <Heading as="h2" size="3xl" style={{ marginBottom: "2rem" }}>
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
          <Grid columns={4} gap="6">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <Skeleton
                  variant="rectangular"
                  style={{ height: "200px", marginBottom: "1rem" }}
                />
                <Skeleton variant="text" style={{ marginBottom: "0.5rem" }} />
                <Skeleton variant="text" style={{ width: "60%" }} />
              </Card>
            ))}
          </Grid>
        )}

        {products && products.length > 0 && (
          <Grid columns={4} gap="6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                image={product.images?.[0]?.url || "/placeholder-product.jpg"}
                rating={product.averageRating || 0}
                discount={product.discount}
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
      <div style={{ padding: "4rem 0", borderTop: "1px solid #e5e5e5" }}>
        <Heading as="h2" size="2xl" style={{ marginBottom: "2rem" }}>
          Design System Test
        </Heading>

        <Grid columns={3} gap="4">
          <Card>
            <Heading as="h3" size="lg">
              Buttons
            </Heading>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1rem",
                flexWrap: "wrap",
              }}
            >
              <Button variant="solid">Solid</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </Card>

          <Card>
            <Heading as="h3" size="lg">
              Badges
            </Heading>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1rem",
                flexWrap: "wrap",
              }}
            >
              <Badge variant="solid">Solid</Badge>
              <Badge variant="subtle">Subtle</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </Card>

          <Card>
            <Heading as="h3" size="lg">
              Typography
            </Heading>
            <div style={{ marginTop: "1rem" }}>
              <Text size="sm">Small text</Text>
              <Text size="md">Medium text</Text>
              <Text size="lg">Large text</Text>
            </div>
          </Card>
        </Grid>
      </div>
    </Container>
  );
}
