const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

// pull the mode, file and password from the command arguments.
const [ mode, file, pass ] = process.argv.slice(2);

if (mode === 'encrypt') {
  encrypt({ filepath: file, password: pass });
}

if (mode === 'decrypt') {
  decrypt({ filepath: file, password: pass });
}