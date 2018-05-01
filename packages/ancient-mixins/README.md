# Ancient Mixins

Core functions, classes, types and interfaces.

[![NPM](https://img.shields.io/npm/v/ancient-mixins.svg)](https://www.npmjs.com/package/ancient-mixins)
[![Build Status](https://travis-ci.org/AncientSouls/Mixins.svg?branch=master)](https://travis-ci.org/AncientSouls/Mixins)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d19d67eee7184b1e8c9fba88bf158ac7)](https://www.codacy.com/app/ivansglazunov/Mixins?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=AncientSouls/Mixins&amp;utm_campaign=Badge_Grade)
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://ancientsouls.github.io/)

## Install

```
npm i --save ancient-mixins
```
## About 

Contents superclasses for mixins with your funcionality.

### Events

TypeScript typed events. Node EventEmitter based class for listening and emitting events.

#### Example

```ts
import {
  Events,
  IEvents,
  IEventsList,
} from 'ancient-mixins/lib/events';

interface ITestEventsList extends IEventsList {
  a: { b: 'c', d?: 'e' };
}

class TestEvents extends Events implements IEvents<ITestEventsList> {}
const events: IEvents<ITestEventsList> = new TestEvents();
const listener = data => console.log('on', data);

events.on('a', listener);
events.on('b', listener);

events.once('a', data => console.log ('once', data));

events.emit('a', { b: 'c' });
// on { b: 'c' }
// once { b: 'c' }

events.emit('a', { d: 'e' });
// Error TS2345: Argument of type '{ d: "e"; }' is not assignable to parameter of type '{ b: "c"; d?: "e"; }'. 
// Property 'b' is missing in type '{ d: "e"; }'.

events.emit('b', { x: 'y' });
// on { x: 'y' }. No error. It's because of extending ITestEventsList with IEventsList interface. Not specified events are allowed.

events.off('a', listener);
events.destroy();
```

### Node

Class Node make Events more material with unique id and isDestroyed state.

### List

Unsafe class List to manipulate nodes. 

#### Example

```ts
import { List } from 'ancient-mixins/lib/list';
import { Node } from 'ancient-mixins/lib/node';

const list = new List();
const node = new Node();

List.on('anyNodeEvent', () => console.log ('anyNodeEvent'));

List.add(node);
node.emit('anyNodeEvent');
// anyNodeEvent
```

### Manager

Class Manager gives control functionality for the lists of nodes and has own events. Contains class List, which has role to communicate node events and manager events.

#### Example

```ts
import { Node } from 'ancient-mixins/lib/node';
import { Manager } from 'ancient-mixins/lib/manager';

const manager = new Manager();
const node = new Node();

manager.on('removed', () => console.log('removed'));
manager.on('added', () => console.log('added'));

manager.add(node);
// added
manager.remove(node);
// removed
manager.add(node);
// added
node.destroy();
// removed
```