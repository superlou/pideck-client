import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
  player: inject(),

  actions: {
    togglePause() {
      console.log('here route')
    }
  }
});
