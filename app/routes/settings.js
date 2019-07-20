import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  player: inject(),

  setupController(controller, /*model*/) {
    controller.set('apiDomain', this.get('player.apiDomain'));
  },

  actions: {
    setDisplayMode(mode) {
      this.get('player').set_display_mode(mode);
    },

    setLooping(state) {
      this.get('player').set_looping(state);
    }
  }
});
