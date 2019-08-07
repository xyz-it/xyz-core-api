export interface ModelAdapter<T> {
  read( ...args: any[]): Promise<T>;
  query(...args: any[]): Promise<T[]>;
  create(obj: T|T[]): Promise<T|T[]>;
  update(obj: T|T[]): Promise<T|T[]>;
  delete(obj: T|T[]): void;
}
