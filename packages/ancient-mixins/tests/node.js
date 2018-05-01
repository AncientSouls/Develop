"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const node_1 = require("../lib/node");
function default_1() {
    describe('Node:', () => {
        it('new / destroy() / id', () => {
            const node = new node_1.Node();
            chai_1.assert.isOk(node.id);
            chai_1.assert.isFalse(node.isDestroyed);
            node.on('destroyed', ({ node }) => {
                chai_1.assert.isTrue(node.isDestroyed);
            });
            node.destroy();
            chai_1.assert.isTrue(node.isDestroyed);
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=node.js.map