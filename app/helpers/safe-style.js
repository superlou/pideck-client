import Helper from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function safeStyle(params, hash) {
 let props = Object.keys(hash).map((key) => {
   return `${key.dasherize()}: ${hash[key]}`;
 });
 return htmlSafe(props.join(';'));
}

export default Helper.helper(safeStyle);
