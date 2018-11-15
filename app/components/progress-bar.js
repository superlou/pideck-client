import Component from '@ember/component';

export default Component.extend({
  click: function(event) {
    let clickX = event.clientX - this.$().position().left;
    this.seek(clickX / this.$().width());
  }
});
