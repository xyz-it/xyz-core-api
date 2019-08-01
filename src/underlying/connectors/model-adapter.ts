export interface ModelAdapter<T> {
  readonly read: ( ...args: any[]) => T;
  readonly query: (...args: any[]) => T[];
  readonly create: (obj: T|T[]) => T|T[];
  readonly update: (obj: T|T[]) => T|T[];
  readonly delete: (obj: T|T[]) => void;
}
