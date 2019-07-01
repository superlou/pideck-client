import Component from '@ember/component';
import { inject } from '@ember/service';

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
    },

    volumeUp() {
      let volume = this.get('player.volume');

      volume *= 1.43;

      if (volume > 2) {
        volume = 2;
      } else if (volume < 0.01) {
        volume = 0.01;
      }

      this.get('player').set_volume(volume);
    },

    volumeDown() {
      let volume = this.get('player.volume');
      this.get('player').set_volume(volume * 0.7);
    },

    volumeMute() {
      this.get('player').set_volume(0);
    }
  }
});
