import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  player: inject(),
  apiDomain: "",

  actions: {
    changeApiDomain: function() {
      this.get('player').changeApiDomain(this.get('apiDomain'));
    },
  }
});
