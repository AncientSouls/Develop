"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const events_1 = require("../lib/events");
function default_1() {
    describe('Events:', () => {
        it('on() / once() / off() / emit()', (done) => {
            class TestEvents extends events_1.Events {
            }
            const events = new TestEvents();
            let counter = 0;
            const listener = (data) => {
                chai_1.assert.deepEqual(data, !counter ? { b: 'c' } : { d: 'e' });
                counter++;
            };
            events.on('a', listener);
            events.once('a', (data) => {
                chai_1.assert.deepEqual(data, { b: 'c' });
                events.once('a', (data) => {
                    chai_1.assert.deepEqual(data, { d: 'e' });
                    events.off('a', listener);
                    events.emit('a', {});
                    done();
                });
                events.emit('a', { d: 'e' });
            });
            events.emit('a', { b: 'c' });
        });
        it('destroy()', () => {
            class TestEvents extends events_1.Events {
            }
            const events = new TestEvents();
            const listener = () => { };
            events.on('a', listener);
            events.on('a', listener);
            chai_1.assert.deepEqual(events.emitter._events, { a: [listener, listener] });
            events.destroy();
            chai_1.assert.deepEqual(events.emitter._events, {});
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=events.js.map