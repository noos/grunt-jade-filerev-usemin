# [grunt](http://gruntjs.com/)-[jade](http://jade-lang.com/)-[filerev](https://github.com/yeoman/grunt-filerev)-[usemin](https://github.com/yeoman/grunt-usemin)
> Grunt plugin for replacing resources in jade files with minified and revved js & css files

[![NPM Version](http://img.shields.io/npm/v/grunt-jade-filerev-usemin.svg)](https://npmjs.org/package/grunt-jade-filerev-usemin)
[![NPM](http://img.shields.io/npm/dm/grunt-jade-filerev-usemin.svg)](https://npmjs.org/package/grunt-jade-filerev-usemin)
[![Gittip](http://img.shields.io/gittip/pgilad.svg)](https://www.gittip.com/noos/)
[![Dependencies](http://img.shields.io/gemnasium/noos/grunt-jade-filrev-usemin.svg)](https://gemnasium.com/noos/grunt-jade-filerev-usemin)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jade-flerev-usemin --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jade-filerev-usemin');
```

## The "jadeFilerevUsemin" task

This project is shamelessly borrowing from [grunt-jade-usemin](https://github.com/pgilad/grunt-jade-usemin) Project,
which is based on the [grunt-usemin](https://github.com/yeoman/grunt-usemin) Project.
`grunt-jade-filerev-usemin` is meant to be an assisting tool in preparing projects for build.
It was created to make [grunt-jade-usemin](https://github.com/pgilad/grunt-jade-usemin) 
work together with [grunt-filerev](https://github.com/yeoman/grunt-filerev).

The plugin will scan the parsed `.jade` files and replace the script/css with the minified ones
(this plugin will not concatenate nor minify your script/css).

Use [grunt-jade-usemin](https://github.com/pgilad/grunt-jade-usemin) to concatenate and minifiy your script/css,
then use [grunt-filerev](https://github.com/yeoman/grunt-filerev) to rename minified script/css with revision number.
`grunt-jade-filerev-usemin` as the last step will correctly replace the reference to script/css in the jade file.

### How to use in a Jade file

The original [grunt-jade-usemin](https://github.com/pgilad/grunt-jade-usemin) relies on environment variable in express
to determine whether to use unminified or minified resources.

**jadeFilerevUsemin** instead creates a new jade file with resources replaced with the minified one.
This may be necessary if you are also renaming minified resouces with [grunt-filerev](https://github.com/yeoman/grunt-filerev).

**jadeFilerevUsemin** relies on [grunt-jade-usemin](https://github.com/pgilad/grunt-jade-usemin) to concatenate and minify the script/css.

**jadeFilerevUsemin** relies on [grunt-filerev](https://github.com/yeoman/grunt-filerev) to rename the minified script/css with the revisioned one.

**jadeFilerevUsemin** simply scans for the following line: `<!-- build:<type> <target -->`.
Where `<target>` can be either `js` or `css`.

**jadeFilerevUsemin** then adds the scripts/styles inside the lines until it meets the closing line:
`<!-- endbuild -->` Which signifies the end of a usemin target.

This is an example `index.jade`:

```jade
//-<!-- build:js test/compiled/compiled.min.js -->
script(src='/test/fixtures/script1.js')
script(src='/test/fixtures/script2.js')
//-<!-- endbuild -->
```

Running `**jadeFilerevUsemin**` on this file will replace the block with
```jade
//-<!-- build:js test/compiled/compiled.min.js -->
script(src='/test/compiled/compiled.min.eba0f92b.js')
//-<!-- endbuild -->
```
Revision number is based on the hash and is produced by
[grunt-filerev](https://github.com/yeoman/grunt-filerev).

Another example is using **jadeFilerevUsemin** with css files:
```jade
//-<!-- build:css test/compiled/style.min.css -->
link(rel='stylesheet', href='/test/fixtures/style1.css')
link(rel='stylesheet', href='/test/fixtures/style2.css')
//-<!-- endbuild -->
```

Above block will be replaced by
```jade
link(rel='stylesheet', href='/test/compiled/style.min.23f8haf2.css')
```

### Available Options
##### Deprefix_dest
`{String} [deprefix_dest='']` This is nearly the opposite of what `prefix` does in [grunt-jade-usemin](https://github.com/pgilad/grunt-jade-usemin).
`Prefix` maps from server based href location to file location relative to Gruntfile, by prefixing.
`Deprefix_dest` maps from file location (of the minified revved file) to server based href location, by stripping prefix.

### Gruntfile.js basic task
In your project's Gruntfile, add a section named `jadeFilerevUsemin` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jadeUsemin: {
    main: {
      options: {
        prefix: '', //optional - add prefix to the path [default='']
        deprefix_dest: '', //optional - add prefix to the path [default='']
      },
      src: 'src/index.jade',
      dest: 'src/index.jade',
    }
  },
})
```


Example `build` task may be defined as follows:

```js
  grunt.registerTask('build', [
    "jadeUsemin",
    "filerev",
    "jadeFilerevUsemin",
  ]);
```

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  jadeUsemin: {
    main: {
      options: {
        prefix: './public/',
        deprefix_dest: '.dist/public',
      },
      src: "server/views/index.jade",
      dest: ".dist/server/views/index.jade",
    }
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2014 noos. Licensed under the MIT license.
