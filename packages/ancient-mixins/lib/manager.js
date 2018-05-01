"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
const list_1 = require("./list");
function mixin(superClass) {
    return class Manager extends superClass {
        constructor() {
            super(...arguments);
            this.list = new list_1.List();
        }
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
exports.mixin = mixin;
exports.MixedManager = mixin(node_1.Node);
class Manager extends exports.MixedManager {
}
exports.Manager = Manager;
//# sourceMappingURL=manager.js.map