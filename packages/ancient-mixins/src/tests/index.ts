require('source-map-support').install();

import events from './events';
import node from './node';
import manager from './manager';

describe('AncientSouls/Mixins:', () => {
  events();
  node();
  manager();
});
