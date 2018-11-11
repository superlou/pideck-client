import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  player: inject(),

  remaining: computed('player.position', 'player.duration', function() {
    return this.get('player.duration') - this.get('player.position');
  }),

  actions: {
    togglePause() {
      this.get('player').togglePause();
    },

    stop() {
      this.get('player').stop();
    }
  }
});
