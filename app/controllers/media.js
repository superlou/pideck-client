import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

function filename_is_audio(filename) {
  let ext = filename.split('.').pop().toLowerCase();
  return ['mp3', 'wav', 'aif', 'mid', 'ogg', 'aac', 'wma', 'flac'].includes(ext);
}

export default Controller.extend({
  player: inject(),
  sortedFiles: computed('model.[]', function() {
    return this.get('model').sortBy('source');
  }),

  music: computed.filter('sortedFiles.[]', function(file) {
    return filename_is_audio(file.get('source'));
  }),

  video: computed.filter('sortedFiles.[]', function(file) {
    return !filename_is_audio(file.get('source'));
  }),
});
