import { TClass, IInstance } from './mixins';
import { INode, INodeEventsList, INodeEventData, TNode } from './node';
export declare type TList = IList<TNode, IListEventsList>;
export interface IListEventsList extends INodeEventsList {
    destroyed: INodeEventData;
}
export interface IList<IN, IEventsList extends IListEventsList> extends INode<IEventsList> {
    Node: TClass<IN>;
    nodes: {
        [id: string]: IN;
    };
    add(node: IN): this;
    wrap(node: IN): this;
    remove(node: IN): this;
    create(id?: string): IN;
}
export declare function mixin<T extends TClass<IInstance>>(superClass: T): any;
export declare const MixedList: TClass<TList>;
export declare class List extends MixedList {
}
