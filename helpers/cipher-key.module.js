const crypto = require('crypto');

function getCipherKey(password) {
    //Calculates the digest of all of the data passed to be hashed (using the hash.update() method). 
    //If encoding is provided a string will be returned; otherwise a Buffer is returned.
    return crypto.createHash('sha256').update(password).digest();
}

module.exports = getCipherKey;