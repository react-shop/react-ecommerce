import { Heading } from "../../Atoms";
import type { LogoProps } from "./types";

export function Logo({ LinkComponent }: LogoProps) {
  return (
    <LinkComponent href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">R</span>
      </div>
      <Heading as="h1" size="lg" className="text-gray-900">
        React Shop
      </Heading>
    </LinkComponent>
  );
}

