/*
 * grunt-jade-filerev-usemin
 *
 *
 * Copyright (c) 2014 noos
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash'),
    path = require('path');

module.exports = function (grunt) {
    var jadeUsemin = require('./lib/jade_filerev_usemin').task(grunt);

    grunt.registerMultiTask('jadeFilerevUsemin', 'replace references to script/css in jade file with minified revved script/css', function () {

        jadeUsemin.options = this.options({});
        grunt.verbose.writeflags(jadeUsemin.options, 'Target Options');

        _.each(this.files, function (fileSrcDest) {
            var fileSrc = fileSrcDest.src;
            var fileDest = fileSrcDest.dest;
            var ext;
            var results;
            var input;
            grunt.log.writeln('Processing jade file', fileSrc);
            ext = path.extname(fileSrc);
            if (ext !== '.jade') {
                grunt.log.warn('Not processing %s because of unsupported extension: %s', fileSrc, ext);
            } else {
                results = jadeUsemin.extractTargetsFromJade(fileSrc, jadeUsemin.extractedTargets);
                input = grunt.file.read(fileSrc)
                for (var key in results) {
                    input = input.replace(results[key].from, results[key].to);
                }
                grunt.file.write(fileDest,input);
            }
        });
    });
};
