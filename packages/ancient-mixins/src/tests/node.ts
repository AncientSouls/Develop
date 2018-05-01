import { assert } from 'chai';

import {
  Node,
} from '../lib/node';

export default function () {
  describe('Node:', () => {
    it('new / destroy() / id', () => {
      const node = new Node();
      assert.isOk(node.id);
      assert.isFalse(node.isDestroyed);
      node.on('destroyed', ({ node }) => {
        assert.isTrue(node.isDestroyed);
      });
      node.destroy();
      assert.isTrue(node.isDestroyed);
    });
  });
}
