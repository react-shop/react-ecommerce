"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Stack, Flex, Text } from "@react-shop/design-system";
import { FormField } from "./FormField";
import Link from "next/link";

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (data: Omit<RegisterFormData, "confirmPassword">) => void;
  isLoading?: boolean;
}

export function RegisterForm({
  onSubmit,
  isLoading = false,
}: RegisterFormProps) {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (data: RegisterFormData) => {
    const { confirmPassword, ...registerData } = data;
    onSubmit(registerData);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Stack className="gap-4">
          <Flex className="gap-4">
            <Stack className="flex-1">
              <FormField
                name="firstName"
                label="First Name"
                placeholder="John"
                required
              />
            </Stack>
            <Stack className="flex-1">
              <FormField
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                required
              />
            </Stack>
          </Flex>

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

          <FormField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            required
          />

          <Button
            type="submit"
            variant="solid"
            size="lg"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>

          <Flex className="justify-center gap-2">
            <Text size="sm" color="secondary">
              Already have an account?
            </Text>
            <Link href="/login">
              <Text
                size="sm"
                weight="medium"
                className="text-primary-600 hover:text-primary-700 cursor-pointer"
              >
                Sign in
              </Text>
            </Link>
          </Flex>
        </Stack>
      </form>
    </FormProvider>
  );
}

