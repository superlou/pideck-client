import Service from '@ember/service';
import { inject } from '@ember/service';
import { later } from '@ember/runloop';
import { computed } from '@ember/object';

export default Service.extend({
  ajax: inject(),
  websockets: inject('socket-io'),
  socketRef: null,
  status: 'unknown',
  source: null,
  position: null,
  duration: null,
  volume: null,

  isLoaded: computed('status', function() {
    return ['Playing', 'Paused'].includes(this.get('status'));
  }),

  isNotLoaded: computed('isLoaded', function() {
    return !this.get('isLoaded');
  }),

  isPlaying: computed('status', function() {
    return this.get('status') === 'Playing';
  }),

  isPaused: computed('status', function() {
    return this.get('status') === 'Paused';
  }),

  apiDomain: 'loupi1:8910',

  apiUrl: computed('apiDomain', function() {
    return `http://${this.get('apiDomain')}/api`
  }),

  mediaFilesUrl: computed('apiUrl', function() {
    return `${this.get('apiUrl')}/media-files`
  }),

  uploadUrl: computed('apiUrl', function() {
    return `${this.get('apiUrl')}/media-files/upload`
  }),

  playerUrl: computed('apiUrl', function() {
    return `${this.get('apiUrl')}/player`
  }),

  init() {
    this._super();

    const socket = this.websockets.socketFor(`ws://${this.get('apiDomain')}`)
    socket.on('connect', this.socketConnectHandler, this);
    socket.on('message', this.socketMessageHandler, this);
    this.set('socketRef', socket);
  },

  socketConnectHandler() {
  },

  socketMessageHandler(data) {
    if (data['player_status']) {
      var result = data['player_status'];
      this.set('status', result.status);
      this.set('source', result.source);
      this.set('position', result.position);
      this.set('duration', result.duration);
      this.set('volume', result.volume);
    }
  },

  togglePause() {
    this.get('ajax').request(this.get('playerUrl'), {
      method: 'POST',
      data: {
        action: 'toggle_pause',
      }
    });
  },

  stop() {
    this.get('ajax').request(this.get('playerUrl'), {
      method: 'POST',
      data: {
        action: 'stop',
      }
    });
  },

  play(source) {
    this.get('ajax').request(this.get('playerUrl'), {
      method: 'POST',
      data: {
        action: 'play',
        source: source,
      }
    });
  },

  seekFraction(fraction) {
    this.get('ajax').request(this.get('playerUrl'), {
      method: 'POST',
      data: {
        action: 'seek_fraction',
        fraction: fraction,
      }
    });
  }
});
