import Service from '@ember/service';
import { inject } from '@ember/service';
import { later } from '@ember/runloop';

export default Service.extend({
  ajax: inject(),
  status: 'unknown',
  source: null,
  position: null,
  duration: null,
  volume: null,

  update() {
    this.get('ajax').request('http://loupi1:8910/api/player').then((result) => {
      this.set('status', result.status);
      this.set('source', result.source);
      this.set('position', result.position);
      this.set('duration', result.duration);
      this.set('volume', result.volume);
    }, (err) => {
      this.set('status', 'unknown');
      this.set('source', null);
    });

    later(this, this.update, 100);
  },

  init() {
    this._super();
    this.update();
  },

  togglePause() {
    this.get('ajax').request('http://loupi1:8910/api/player', {
      method: 'POST',
      data: {
        action: 'toggle_pause',
      }
    });
  },

  stop() {
    this.get('ajax').request('http://loupi1:8910/api/player', {
      method: 'POST',
      data: {
        action: 'stop',
      }
    });
  },

  play(source) {
    this.get('ajax').request('http://loupi1:8910/api/player', {
      method: 'POST',
      data: {
        action: 'play',
        source: source,
      }
    });
  }
});
