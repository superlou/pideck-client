import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  player: inject(),

  setupController(controller, /*model*/) {
    controller.set('apiDomain', this.get('player.apiDomain'));
  }
});
