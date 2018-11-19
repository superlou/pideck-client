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

    error(error, transition) {
      this.transitionTo('settings');
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
