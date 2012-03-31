// visual pad
console.log('');

console.error(' regular console.error, no clue where it came from');

// visual pad
process.stdout.write(' ');

require('./myconsole').replace();

console.error('this is my console.error');

// visual pad
console.log('');

console.restore();

console.log(' regular console.log, no clue where it came from');

console.replace();

// visual pad
process.stdout.write(' ');

console.log('this is my console.log');

// pad
console.log('');

