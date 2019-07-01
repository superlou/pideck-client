import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { task } from 'ember-concurrency';

export default Route.extend({
  player: inject(),

  model: function() {
    return this.store.findAll('media-file');
  },

  actions: {
    play(source) {
      this.get('player').play(source);
    },

    delete(mediaFile) {
      mediaFile.destroyRecord();
    },

    uploadMedia(file) {
      this.get('uploadMediaFile').perform(file);
    },

    error(/*error, transition*/) {
      this.transitionTo('settings');
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
  },

  uploadMediaFile: task(function * (file) {
    try {
      let response = yield file.upload(this.get('player.uploadUrl'));
      this.set('model', this.store.findAll('media-file'));
    } catch (e) {
      console.log('Error uploading')
    }
  }).maxConcurrency(3).enqueue(),
});
