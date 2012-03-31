
/**
 * Module dependencies.
 */

var callsite = require('callsite')
  , tty = require('tty')
  , util = require('util')
  , origin = {}
  ;

origin.log = console.log
origin.info = console.info
origin.warn = console.warn
origin.error = console.error
origin.dir = console.dir

var styles = {
  //styles
  'bold'      : ['\033[1m',  '\033[22m'],
  'italic'    : ['\033[3m',  '\033[23m'],
  'underline' : ['\033[4m',  '\033[24m'],
  'inverse'   : ['\033[7m',  '\033[27m'],
  //grayscale
  'white'     : ['\033[37m', '\033[39m'],
  'grey'      : ['\033[90m', '\033[39m'],
  'black'     : ['\033[30m', '\033[39m'],
  //colors
  'blue'      : ['\033[34m', '\033[39m'],
  'cyan'      : ['\033[36m', '\033[39m'],
  'green'     : ['\033[32m', '\033[39m'],
  'magenta'   : ['\033[35m', '\033[39m'],
  'red'       : ['\033[31m', '\033[39m'],
  'yellow'    : ['\033[33m', '\033[39m']
};

exports.log = function() {
  arguments[0] = traceFormat(__stack[1], styles.grey) + arguments[0];
  process.stdout.write(util.format.apply(this, arguments) + '\n');
}

exports.info = function() {
  arguments[0] = traceFormat(__stack[1], styles.green) + arguments[0];
  process.stdout.write(util.format.apply(this, arguments) + '\n');
}

exports.warn = function() {
  arguments[0] = traceFormat(__stack[1], styles.yellow) + arguments[0];
  process.stderr.write(util.format.apply(this, arguments) + '\n');
}

exports.error = function() {
  arguments[0] = traceFormat(__stack[1], styles.red) + arguments[0];
  process.stderr.write(util.format.apply(this, arguments) + '\n');
}

exports.dir = function(obj) {
  process.stdout.write(traceFormat(__stack[1], styles.blue) + util.inspect(obj, false, null, tty.isatty()) + '\n');
}

exports.traceError = function(obj, stackPos) {
  if(obj instanceof Error) {
    process.stderr.write(traceFormat(__stack[stackPos || 1], styles.red) + obj.stack + '\n');
  } else {
    process.stderr.write(traceFormat(__stack[stackPos || 1], styles.red) + util.inspect(obj, false, null, tty.isatty()) + '\n');
  }
}

exports.ifError = function(err) {
  if(err) {
    exports.traceError(err, 2);
  }
}

/**
 * formatting function.
 *
 * @param {CallSite}
 * @param {String} calling method
 * @api public
 */

function traceFormat (call, style) {
  var basename = call.getFileName().replace(process.cwd() + '/', '')
    , str = '[' + basename + ':' + call.getLineNumber() + '] '

  if (false === console.traceColors || tty.isatty()) {
    return style[0] + str + style[1];
  } else {
    return str;
  }
}

/**
 * Adds trace getter to the `console` object.
 *
 * @api public
 */
exports.replace = function() {

  function replace() {
    console.log = exports.log
    console.info = exports.info
    console.warn = exports.warn
    console.error = exports.error
    console.dir = exports.dir
    console.traceError = exports.traceError
    console.ifError = exports.ifError
  }

  function restore() {
    console.log = origin.log
    console.error = origin.error
    console.warn = origin.warn
    console.info = origin.info
    console.dir = origin.dir
  }

  console.replace = exports.replace = replace;
  console.restore = exports.restore = restore;

  replace();
}
