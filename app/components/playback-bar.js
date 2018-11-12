import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['playback-bar'],
  classNameBindings: ['isLoaded'],

  remaining: computed('position', 'duration', function() {
    return this.get('duration') - this.get('position');
  }),

  isLoaded: computed('duration', function() {
    return this.get('duration') != null;
  }),

  progressPercent: computed('isLoaded', 'duration', 'position', function() {
    if (!this.get('isLoaded')) {
      return "0%";
    } else {
      return (100.0 * this.get('position') / this.get('duration')) + "%";
    }
  }),
});
