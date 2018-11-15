import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  player: inject(),
  classNames: ['player-controls'],

  actions: {
    togglePause() {
      this.get('player').togglePause();
    },

    stop() {
      this.get('player').stop();
    },

    seek(fraction) {
      this.get('player').seekFraction(fraction);
    }
  }
});
