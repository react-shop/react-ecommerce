"use client";

import { Input, Text, Stack } from "@react-shop/design-system";
import { useFormContext } from "react-hook-form";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export function FormField({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <Stack className="gap-2">
      <label htmlFor={name}>
        <Text size="sm" weight="medium">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </Text>
      </label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        isInvalid={!!error}
        {...register(name)}
      />
      {error && (
        <Text size="sm" color="error">
          {error}
        </Text>
      )}
    </Stack>
  );
}

