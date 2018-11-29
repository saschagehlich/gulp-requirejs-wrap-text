'use strict';
var wraptext = require('../');
var should = require('should');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
require('mocha');

var createFile = function (filepath, contents) {
  var base = path.dirname(filepath);
  return new gutil.File({
    path: filepath,
    base: base,
    cwd: path.dirname(base),
    contents: contents
  });
};

describe('gulp-requirejs-wrap-text', function() {
  describe('wraptext()', function() {
    before(function() {
      this.testData = function (expected, done) {
        return function (newFile) {
          should.exist(newFile);
          should.exist(newFile.contents);
          String(newFile.contents).should.equal(expected);

          done.call(this);
        };
      };
    });

    it('should turn a text file into a requirejs module', function(done) {
      var filepath = 'test/fixtures/test.haml';
      var contents = Buffer.from(fs.readFileSync(filepath));
      var expected = 'test/fixtures/test.haml.js';

      wraptext()
        .on('error', done)
        .on('data', this.testData(fs.readFileSync(expected).toString(), done))
        .write(createFile(filepath, contents));
    });
  });
});
