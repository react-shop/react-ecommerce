import { Input } from "@react-shop/design-system";
import type { SearchBarProps } from "./types";

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search products...",
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </form>
  );
}

