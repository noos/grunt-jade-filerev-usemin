/**
 * Created by noos on 03/23/14.
 */
'use strict';

var path = require('path'),
    _ = require('lodash');

var results = {};

exports.task = function (grunt) {
    var exports = {
        options: {}
    };

    //contains all of our targets
    exports.extractedTargets = {};

    // set up relevant regex for jade find
    exports.regex = {
        buildRegex: /<!-- build/,
        buildExtractRegex: /build:(\w+)\s+((\w*[\/._-]*)+)/,
        endBuildRegex: /<!-- endbuild/,
        jsSourceRegex: /src=['"]((\w*[\/._-]*)+)['"]/,
        cssSourceRegex: /href=['"]((\w*[\/._-]*)+)['"]/
    };

    exports.getSrcRegex = function (type) {
        if (type === 'js') {
            return exports.regex.jsSourceRegex;
        } else if (type === 'css') {
            return exports.regex.cssSourceRegex;
        }
        return null;
    };

    exports.insertSrcIntoTargetObj = function (tempExtraction, target, src) {
        grunt.verbose.writelns('Adding src file ' + src);
        tempExtraction[target].src.push(src);
    };


    exports.extractTargetsFromJade = function (location, extractedTargets) {
        //current temp file
        var srcRegex, insideBuild = false;
        var target = null,
            extracted = [],
            type = null,
            tempExtraction = {};
var blocks={};

        var file = grunt.file.read(location).split('\n');

        _.each(file, function (line, lineIndex) {

            //if still scanning for build:<type>
            if (!insideBuild) {

                //look for pattern build:<type>
                if (line.match(exports.regex.buildRegex)) {

                    extracted = line.match(exports.regex.buildExtractRegex);
                    type = extracted[1];
                    target = extracted[2];


var target_revved;
if (grunt.filerev && grunt.filerev.summary) {
    console.log(grunt.filerev.summary);
    target_revved = grunt.filerev.summary[path.normalize(target)];
    if (path.normalize(target) in grunt.filerev.summary) {
        // target_revved = grunt.filerev.summary[path.normalize(target)];
        target = grunt.filerev.summary[path.normalize(target)];
    }
}
target = target.replace(/\\/g,'/');
if (exports.options.deprefix_dest) {
    target = target.replace(exports.options.deprefix_dest,'');
}

blocks[target]=[line];

                    //if unrecognized build type
                    if (!_.contains(['css', 'js'], type)) {
                        grunt.log.error('Unsupported build type: ' + type + ' in line number:' + lineIndex);
                        return;
                    } else if (!target) {
                        grunt.log.warn('Target not found in line:' + line);
                        return;
                    }

                    grunt.verbose.writelns('Found build:<type> pattern in line:', lineIndex);

                    //default empty target
                    tempExtraction[target] = {
                        type: type,
                        src: []
                    };

                    insideBuild = true;
                }
            }
            //got to end of build: <!-- endbuild -->
            else if (line.match(exports.regex.endBuildRegex) && type && target) {

// match ended
blocks[target].push(line);
results[target].from = blocks[target].join("\n"),


                grunt.verbose.writelns('Found endbuild pattern in line ', lineIndex);
                extractedTargets[target] = {};

                _.merge(extractedTargets[target], tempExtraction[target]);

                grunt.log.oklns('Finished with target block:', target);
                type = target = insideBuild = null;
            }
            //we are inside a build:<type> block
            else {
// inside match                
blocks[target].push(line);

                srcRegex = exports.getSrcRegex(type);
                var src = line.match(srcRegex);

                if (src && src[1]) {
                    
// FIX ME:
//  this implementation sets result.target.to for each script in the block
results[target] = {to: line.replace(src[1],target)};

                }
            }
        }); // _.each(file, function (line, lineIndex) {

        if (insideBuild) {
            grunt.fatal("Couldn't find `endbuild` in file: " + location + ", target: " + target);
        }

        return results;
    };

    return exports;
};
