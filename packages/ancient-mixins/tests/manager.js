"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const node_1 = require("../lib/node");
const manager_1 = require("../lib/manager");
function default_1() {
    describe('Manager:', () => {
        it('add() / added / destroy() / removed', (done) => {
            const manager = new manager_1.Manager();
            manager.on('removed', ({ node, manager: m }) => {
                chai_1.assert.equal(m, manager);
                chai_1.assert.isEmpty(manager.list.nodes);
                done();
            });
            manager.on('added', ({ node, manager: m }) => {
                chai_1.assert.equal(m, manager);
                chai_1.assert.isNotEmpty(manager.list.nodes);
                node.destroy();
            });
            manager.add(new node_1.Node());
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=manager.js.map