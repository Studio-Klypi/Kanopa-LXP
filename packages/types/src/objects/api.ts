import { Extended, List } from "./object.js";

export class ApiResponse<T> {
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}

export class PaginatedResponse<T, V = undefined> {
  data: List<T>;
  meta: Extended<
    {
      total: number;
      page?: number;
      limit?: number;
    },
    V
  >;

  constructor(data: List<T>, meta: PaginatedResponse<T>["meta"]) {
    this.data = data;
    this.meta = meta;
  }
}
