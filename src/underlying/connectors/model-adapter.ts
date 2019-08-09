export interface ModelAdapter<T> {
  read( ...args: any[]): Promise<T>;
  query(...args: any[]): Promise<T[]>;
  create(obj: T|T[]): Promise<T|T[]>;
  update(obj: T|T[]): Promise<T|T[]>;
  delete(obj: T|T[]): void;
}

export interface FlexAdapter {
  read<T>( ...args: any[]): Promise<T>;
  query<T>(...args: any[]): Promise<T[]>;
  create<T>(obj: T|T[]): Promise<T|T[]>;
  update<T>(obj: T|T[]): Promise<T|T[]>;
  delete<T>(obj: T|T[]): void;
}
