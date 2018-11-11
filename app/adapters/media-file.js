import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'http://loupi1:8910',
  namespace: 'api'
});
