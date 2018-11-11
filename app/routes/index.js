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

    uploadMedia(file) {
      this.get('uploadMediaFile').perform(file);
    }
  },

  uploadMedia(file) {
    console.log('test');
  },

  uploadMediaFile: task(function * (file) {
    try {
      let response = yield file.upload('http://loupi1:8910/media/upload');
    } catch (e) {
      console.log('Error uploading')
    }
  }).maxConcurrency(3).enqueue(),
});
