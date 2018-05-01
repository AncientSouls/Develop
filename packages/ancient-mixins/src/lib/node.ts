import { v4 } from 'uuid';

import {
  TClass,
  IInstance,
} from './mixins';

import {
  Events,
  IEvents,
  IEventsList,
} from './events';

export type TNode = INode<INodeEventsList>;

export interface INodeEventData {
  node: INode<INodeEventsList>;
}

export interface INodeEventsList extends IEventsList {
  /**
  * Emits, when called `node.destroy()`.
  */
  destroyed: INodeEventData;
}

export interface INode<IEventsList extends INodeEventsList> extends IEvents<IEventsList> {
  /**
   * Unic string for this node.
   */
  id: string;

  /**
   * Constructor can use given string as id.
   */
  new (id?: string);

  /**
   * Uuid v4 method to generate id.
   */
  generateId(): string;

  /**
   * Does this node took the destroy command?
   */
  isDestroyed: boolean;

  /**
   * Emits 'destroyed' event, change `this.isDestroyed` to true and off all events.
   */
  destroy(): void;
}

/**
 * Mixin your Events with Node functionality.
 * @example
 * ```typescript
 * 
 * import { mixin, INodeEventsList, INode } from 'ancient-mixins/lib/node';
 * import { Events } from 'ancient-mixins/lib/events';
 * import { TClass } from 'ancient-mixins/lib/mixins';
 * 
 * const MyNode: TClass<INode<INodeEventsList>> = mixin(Events);
 * ```
 */
export function mixin<T extends TClass<IInstance>>(
  superClass: T,
): any {
  return class Node extends superClass {
    public id;
    
    constructor(...args) {
      super();
      this.id = args[0] || this.generateId();
    }
    
    generateId() {
      return v4();
    }
    
    isDestroyed = false;
    
    destroy() {
      if (!this.isDestroyed) {
        this.isDestroyed = true;
        this.emit('destroyed', { node: this });
        super.destroy();
      }
    }
  };
}

export const MixedNode: TClass<INode<INodeEventsList>> = mixin(Events);
/**
 * Already mixed class. Plug and play.
 */
export class Node extends MixedNode {}
