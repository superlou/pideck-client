import DS from 'ember-data';
import { inject } from '@ember/service';
import { alias } from '@ember/object/computed';

export default DS.JSONAPIAdapter.extend({
  player: inject(),
  host: alias('player.apiUrl'),
});
