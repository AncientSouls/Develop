import { TClass, IInstance } from './mixins';
import { INode, INodeEventsList, TNode } from './node';
export declare type TManager = IManager<TNode, IManagerEventsList>;
export interface IManagerEventData {
    node: TNode;
    manager: TManager;
}
export interface IManagerEventsList extends INodeEventsList {
    added: IManagerEventData;
    removed: IManagerEventData;
}
export interface IManager<IN, IEventsList extends IManagerEventsList> extends INode<IEventsList> {
    List: TClass<IN>;
    add(node: IN): this;
    wrap(node: IN): this;
    remove(node: IN): this;
}
export declare function mixin<T extends TClass<IInstance>>(superClass: T): any;
export declare const MixedManager: TClass<TManager>;
export declare class Manager extends MixedManager {
}
