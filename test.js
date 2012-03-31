require('./myconsole').replace();

console.log('replace with myconsole');
console.log('this is log');
console.info('this is info');
console.warn('this is warn');
console.error('this is error');
console.log('console.traceError')
console.traceError({msg: 'this is an object'});
console.traceError(new Error('this is an error'));

console.restore();
console.log('');
console.log('restore to origin console');
console.log('this is log');
console.info('this is info');
console.warn('this is warn');
console.error('this is error');
