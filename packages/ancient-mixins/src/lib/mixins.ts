export interface IInstance {
  [key: string]: any;
}

export type TClass<T> = new (...args: any[]) => T;
