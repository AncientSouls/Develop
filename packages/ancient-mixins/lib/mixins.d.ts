export interface IInstance {
    [key: string]: any;
}
export declare type TClass<T> = new (...args: any[]) => T;
