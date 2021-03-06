import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ma-user', 'Integration | Component | ma user', {
  integration: true,
});

test('it renders', function(assert) {
  // inline usage
  this.render(hbs`{{ma-user}}`);
  assert.equal(this.$().text().trim(), '');

  // template block usage
  this.render(hbs`
    {{#ma-user}}
      template block text
    {{/ma-user}}
  `);
  assert.equal(this.$().text().trim(), 'template block text');
});
