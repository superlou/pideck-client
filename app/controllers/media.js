import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  player: inject(),
  sortedFiles: computed('model.[]', function() {
    return this.get('model').sortBy('source');
  }),
});
