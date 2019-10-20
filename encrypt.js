const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const getCipher = require('./helpers/cipher-key.module');
const AppendInitVect = require('./helpers/init-vector.module');

function getPath(filepath) {
    return './output/' + path.basename(filepath, path.extname(filepath)) + '.enc';
}

function encrypt({filepath, password}) {
    // initialization vector which is always unique and random.
    // the key protects the encrypted data, whereas the use of a random initialization vector 
    // ensures that information is not leaked by the cipher text itself
    const initVect = crypto.randomBytes(16);
    const appendInitVect = new AppendInitVect(initVect);

    // hash key 
    const key = getCipher(password);

    // creates Cipher object with provided algo, key and initvect
    // Cipher objects are used to encrypt data
    const cipher = crypto.createCipheriv('aes256', key, initVect);
    const readstream = fs.createReadStream(filepath);
    const writestream = fs.createWriteStream(getPath(filepath));

    readstream
        .pipe(cipher)
        .pipe(appendInitVect)
        .pipe(writestream);
}

module.exports = encrypt;
