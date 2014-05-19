'use strict';
module.exports = function (data) {
  return [
    'define([], function () {',
    '  return ' + JSON.stringify(data) + ';',
    '});',
    ''
  ].join('\n');
};
