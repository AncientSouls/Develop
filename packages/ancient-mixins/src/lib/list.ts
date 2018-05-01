import * as EventEmitter from 'events';
import * as _ from 'lodash';

import {
  TClass,
  IInstance,
} from './mixins';

import {
  Node,
  INode,
  INodeEventsList,
  INodeEventData,
  TNode,
} from './node';

export type TList = IList<TNode, IListEventsList>;

export interface IListEventsList extends INodeEventsList {
  /**
  * Emits, when called `node.destroy()`.
  */
  destroyed: INodeEventData;
}

export interface IList<IN, IEventsList extends IListEventsList> extends INode<IEventsList> {
  /**
   * Node class for simple adding new item to list.
   */
  Node: TClass<IN>;

  /**
   * Container for list.
   */
  nodes: { [id:string]: IN };

  /**
   * Add item to list.
   */
  add(node: IN): this;

  /**
   * Unsafe. Adding `Emit` event for node events.
   */
  wrap(node: IN): this;

  /**
   * Remove node from list.
   */
  remove(node: IN): this;
  
  /**
   * Create node with string id.
   */
  create(id?: string): IN;
}

/**
 * Mixin your Node with List functionality.
 * @example
 * ```typescript
 * 
 * import { mixin, TList } from 'ancient-mixins/lib/List';
 * import { TClass } from 'ancient-mixins/lib/mixins';
 * const MixedList: TClass<TList> = mixin(Node);
 * ```
 */
export function mixin<T extends TClass<IInstance>>(
  superClass: T,
): any {
  return class List extends superClass {
    public Node = Node;
    
    nodes = {};
    
    add(node) {
      this.nodes[node.id] = node;
      this.wrap(node);
      
      return this;
    }
    
    wrap(node) {
      const listener = ({ eventName, data }) => {
        this.emit(eventName, data);
      };
      node.on('emit', listener);
      this.on('destroyed', () => node.off('emit', listener));
      
      return this;
    }
    
    remove(node) {
      if (this.nodes[node.id]) {
        delete this.nodes[node.id];
      }
      
      return this;
    }
  };
}

export const MixedList: TClass<TList> = mixin(Node);
/**
 * Already mixed class. Plug and play.
 */
export class List extends MixedList {}
