"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Stack, Flex, Text } from "@react-shop/design-system";
import { FormField } from "./FormField";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack className="gap-4">
          <FormField
            name="email"
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            required
          />

          <FormField
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            required
          />

          <Flex className="justify-end">
            <Link href="/forgot-password">
              <Text
                size="sm"
                className="text-primary-600 hover:text-primary-700 cursor-pointer"
              >
                Forgot password?
              </Text>
            </Link>
          </Flex>

          <Button
            type="submit"
            variant="solid"
            size="lg"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <Flex className="justify-center gap-2">
            <Text size="sm" color="secondary">
              Don't have an account?
            </Text>
            <Link href="/register">
              <Text
                size="sm"
                weight="medium"
                className="text-primary-600 hover:text-primary-700 cursor-pointer"
              >
                Sign up
              </Text>
            </Link>
          </Flex>
        </Stack>
      </form>
    </FormProvider>
  );
}

