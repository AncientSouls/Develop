import { assert } from 'chai';

import {
  Node,
} from '../lib/node';

import {
  Manager,
} from '../lib/manager';

export default function () {
  describe('Manager:', () => {
    it('add() / added / destroy() / removed', (done) => {
      const manager = new Manager();
      manager.on('removed', ({ node, manager: m }) => {
        assert.equal(m, manager);
        assert.isEmpty(manager.list.nodes);
        done();
      });
      manager.on('added', ({ node, manager: m }) => {
        assert.equal(m, manager);
        assert.isNotEmpty(manager.list.nodes);
        node.destroy();
      });
      manager.add(new Node());
    });
  });
}
