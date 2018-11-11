import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  player: inject(),

  model: function() {
    return this.store.findAll('media-file');
  },

  actions: {
    play(source) {
      this.get('player').play(source);
    }
  }
});
