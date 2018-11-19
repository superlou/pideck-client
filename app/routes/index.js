import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { task } from 'ember-concurrency';

export default Route.extend({
  beforeModel(transition) {
    this.transitionTo('media');
  }
});
