import { helper } from '@ember/component/helper';

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

export function formatSeconds(raw/*, hash*/) {
  let minutes = Math.floor(raw / 60);
  let seconds = Math.floor(raw % 60);
  let tenths = Math.floor((raw % 1) * 10);
  return `${minutes.pad(2)}:${seconds.pad(2)}.${tenths}`;
}

export default helper(formatSeconds);
