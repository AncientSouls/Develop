import { TClass, IInstance } from './mixins';
import { IEvents, IEventsList } from './events';
export declare type TNode = INode<INodeEventsList>;
export interface INodeEventData {
    node: INode<INodeEventsList>;
}
export interface INodeEventsList extends IEventsList {
    destroyed: INodeEventData;
}
export interface INode<IEventsList extends INodeEventsList> extends IEvents<IEventsList> {
    id: string;
    new (id?: string): any;
    generateId(): string;
    isDestroyed: boolean;
    destroy(): void;
}
export declare function mixin<T extends TClass<IInstance>>(superClass: T): any;
export declare const MixedNode: TClass<INode<INodeEventsList>>;
export declare class Node extends MixedNode {
}
