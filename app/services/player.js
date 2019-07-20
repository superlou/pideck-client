import Service from '@ember/service';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  ajax: inject(),
  websockets: inject('socket-io'),
  socketRef: null,
  status: 'unknown',
  source: null,
  position: null,
  duration: null,
  volume: 0,
  isConnected: false,

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

  apiDomain: '127.0.0.1:8910',

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

  displayUrl: computed('apiUrl', function() {
    return `${this.get('apiUrl')}/display`
  }),

  init() {
    this._super();

    let apiDomain = localStorage.getItem('apiDomain');
    if (apiDomain) {
      this.set('apiDomain', apiDomain);
    }

    const socket = this.websockets.socketFor(`ws://${this.get('apiDomain')}`)
    socket.on('connect', this.socketConnectHandler, this);
    socket.on('disconnect', this.socketDisconnectHandler, this);
    socket.on('message', this.socketMessageHandler, this);
    this.set('socketRef', socket);
  },

  changeApiDomain(newApiDomain) {
    this.get('socketRef').close();

    this.set('apiDomain', newApiDomain);
    localStorage.setItem('apiDomain', newApiDomain);

    const socket = this.websockets.socketFor(`ws://${this.get('apiDomain')}`)
    socket.on('connect', this.socketConnectHandler, this);
    socket.on('disconnect', this.socketDisconnectHandler, this);
    socket.on('message', this.socketMessageHandler, this);
    this.set('socketRef', socket);
  },

  socketConnectHandler() {
    this.set('isConnected', true);
  },

  socketDisconnectHandler() {
    this.set('isConnected', false);
  },

  socketMessageHandler(data) {
    if (data['player_status']) {
      var result = data['player_status'];
      this.set('status', result.status);
      this.set('source', result.source);
      this.set('position', result.position);
      this.set('duration', result.duration);
      this.set('volume', result.volume);
      this.set('looping', result.looping);
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

  set_volume(volume) {
    this.get('ajax').request(this.get('playerUrl'), {
      method: 'POST',
      data: {
        action: 'set_volume',
        volume: volume,
      }
    });
  },

  set_display_mode(mode) {
    this.get('ajax').request(this.get('displayUrl'), {
      method: 'POST',
      data: {
        mode: mode,
      }
    });
  },

  set_looping(state) {
    this.get('ajax').request(this.get('playerUrl'), {
      method: 'POST',
      data: {
        action: 'set_looping',
        state: state,
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
