export type Route = (...args: string[]) => string;

export interface Routes {
  PUBLIC: Record<string, Route>;
  PRIVATE: Record<string, Route>;
}
