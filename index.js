'use strict';
var es = require('event-stream');
var gutil = require('gulp-util');
var Buffer = require('buffer').Buffer;
var path = require('path');
var wrap = require('./lib/wrap');

module.exports = function (opt) {
  function modifyFile(file) {
    if (file.isNull()) { return this.emit('data', file); } // pass along
    if (file.isStream()) return this.emit('error', new Error("gulp-requirejs-wrap-text: Streaming not supported"));

    var data;
    var str = file.contents.toString('utf8');

    if (opt) {
      options = {
        filename: file.path,
        sourceFiles: [path.basename(file.path)],
        generatedFile: path.basename(dest)
      };
    }

    try {
      data = wrap(str);
    } catch (err) {
      return this.emit('error', new Error(err));
    }

    file.contents = Buffer.from(data);
    this.emit('data', file);
  }

  return es.through(modifyFile);
};
