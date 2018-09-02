import _ from 'lodash';

export default (object = {}) =>
  _.mapValues(object, val => (val === '' ? null : val));
