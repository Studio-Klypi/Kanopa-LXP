export type List<T = unknown> = T[];
export type ObjectLiteral<T = unknown> = Record<string | number | symbol, T>;

export type Nullable<T = unknown> = T | null;
export type Optional<T = unknown> = T | undefined;

export type Extended<T, V> = T & V;

export type Callback<T = void> = () => T | Promise<T>;
