import * as _ from 'lodash';

import {
  TClass,
  IInstance,
} from './mixins';

import {
  Node,
  INode,
  INodeEventsList,
  TNode,
} from './node';

import {
  List,
} from './list';

export type TManager = IManager<TNode, IManagerEventsList>;

export interface IManagerEventData {
  node: TNode;
  manager: TManager;
}

export interface IManagerEventsList extends INodeEventsList {
  /**
  * Emits, when called `manager.add()`.
  */
  added: IManagerEventData;

  /**
  * Emits, when called `manager.remove()`.
  */
  removed: IManagerEventData;
}

export interface IManager<IN, IEventsList extends IManagerEventsList> extends INode<IEventsList> {
  /**
   * Current instance of a List class.
   */
  List: TClass<IN>;

  /**
   * Adds item to list with emitting event `added`.
   */
  add(node: IN): this;

  /**
   * Adds listener, which remove node from list after `destroyed` event.
   */
  wrap(node: IN): this;

  /**
   * Remove node from list with emitting event `removed`.
   */
  remove(node: IN): this;
}

/**
 * Mixin your Node with manager functionality.
 * @example
 * ```typescript
 * 
 * import { mixin, TManager } from 'ancient-mixins/lib/manager';
 * import { Node } from 'ancient-mixins/lib/node';
 * import { TClass } from 'ancient-mixins/lib/mixins';
 * const MixedManager: TClass<TManager> = mixin(Node);
 * ```
 */
export function mixin<T extends TClass<IInstance>>(
  superClass: T,
): any {
  return class Manager extends superClass {
    public list = new List();
    
    add(node) {
      if (node.isDestroyed) {
        throw new Error(`Destroyed node ${node.id} cant be added to ${this.id}.`);
      }

      this.list.add(node);
      this.wrap(node);
      this.emit('added', { node, manager: this });
      
      return this;
    }
    
    wrap(node) {
      node.on('destroyed', () => this.remove(node));
      
      return this;
    }
    
    remove(node) {
      this.list.remove(node);
      this.emit('removed', { node, manager: this });
      
      return this;
    }

    destroy() {
      this.list.destroy();
      super.destroy();
    }
  };
}

export const MixedManager: TClass<TManager> = mixin(Node);
/**
 * Already mixed class. Plug and play.
 */
export class Manager extends MixedManager {}
