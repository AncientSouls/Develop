import { assert } from 'chai';

import {
  Events,
  IEvents,
  IEventsList,
} from '../lib/events';

export default function () {
  describe('Events:', () => {
    it('on() / once() / off() / emit()', (done) => {
      interface ITestEventsList extends IEventsList {
        a: { b?: 'c', d?: 'e' };
      }
      
      class TestEvents extends Events implements IEvents<ITestEventsList> {}
      
      const events: IEvents<ITestEventsList> = new TestEvents();
      
      let counter = 0;      
      const listener = (data) => {
        assert.deepEqual(data, !counter ? { b: 'c' } : { d: 'e' });
        counter++;
      };
      
      events.on('a', listener);
      events.once('a', (data) => {
        assert.deepEqual(data, { b: 'c' });
        events.once('a', (data) => {
          assert.deepEqual(data, { d: 'e' });
          events.off('a', listener);
          events.emit('a', {});
          done();
        });
        events.emit('a', { d: 'e' });
      });
      events.emit('a', { b: 'c' });
    });
    it('destroy()', () => {
      interface ITestEventsList extends IEventsList {
        a: { b?: 'c', d?: 'e' };
      }
      
      class TestEvents extends Events implements IEvents<ITestEventsList> {}
      
      const events: any = new TestEvents();
      const listener = () => {};
      events.on('a', listener);
      events.on('a', listener);
      assert.deepEqual(events.emitter._events, { a: [listener, listener] });
      events.destroy();
      assert.deepEqual(events.emitter._events, {});
    });
  });
}
