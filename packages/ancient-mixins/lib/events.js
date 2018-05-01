"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const EventEmitter = require("events");
function mixin(superClass) {
    return class Events extends superClass {
        constructor() {
            super(...arguments);
            this.emitter = new EventEmitter();
        }
        emit(eventName, data) {
            this.emitter.emit(eventName, data);
            this.emitter.emit('emit', { eventName, data });
            return this;
        }
        on(eventName, listener) {
            this.emitter.on(eventName, listener);
            return this;
        }
        once(eventName, listener) {
            this.emitter.once(eventName, listener);
            return this;
        }
        off(eventName, listener) {
            this.emitter.removeListener(eventName, listener);
            return this;
        }
        destroy() {
            const emitter = this.emitter;
            _.each(emitter._events, (f, name) => this.emitter.removeAllListeners(name));
        }
    };
}
exports.mixin = mixin;
exports.MixedEvents = mixin(class {
});
class Events extends exports.MixedEvents {
}
exports.Events = Events;
//# sourceMappingURL=events.js.map