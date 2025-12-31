"use client";

import { useState } from "react";
import { Container, Card, Heading, Text, Stack, Button } from "@react-shop/design-system";
import { ForgotPasswordForm, ForgotPasswordFormData } from "../components";
import Link from "next/link";

export function ForgotPasswordScreen() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    
    // TODO: Implement forgot password API call when backend is ready
    console.log("Forgot password:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <Container maxWidth="sm" className="py-16">
        <Card padding="lg">
          <Stack className="gap-6">
            <Stack className="gap-2">
              <Heading as="h1" size="3xl" className="text-center">
                Check Your Email
              </Heading>
              <Text size="md" color="secondary" align="center">
                We've sent password reset instructions to your email address.
                Please check your inbox and follow the link to reset your
                password.
              </Text>
            </Stack>

            <Link href="/login">
              <Button variant="outline" size="lg" fullWidth>
                Back to Login
              </Button>
            </Link>
          </Stack>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" className="py-16">
      <Card padding="lg">
        <Stack className="gap-6">
          <Stack className="gap-2">
            <Heading as="h1" size="3xl" className="text-center">
              Forgot Password?
            </Heading>
            <Text size="md" color="secondary" align="center">
              Enter your email address and we'll send you instructions to reset
              your password.
            </Text>
          </Stack>

          <ForgotPasswordForm onSubmit={handleSubmit} isLoading={isLoading} />
        </Stack>
      </Card>
    </Container>
  );
}

