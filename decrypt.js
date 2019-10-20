const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const getCipher = require('./helpers/cipher-key.module');

function getPath(filepath) {
    return './output/' + path.basename(filepath, path.extname(filepath)) + '.dec';
}

function decrypt({filepath, password}) {
    // First, get the init vector preprended to our encrypted file (first 16 bytes)
    const readInitVector = fs.createReadStream(filepath, {end: 15});

    let initVect;
    readInitVector.on('data', (chunk) => {
        initVect = chunk;
    });

    // decrypt file
    readInitVector.on('close', () => {
        const key = getCipher(password);
        // read file stream from 16th byte
        const readstream = fs.createReadStream(filepath, {start: 16});
        const decipher = crypto.createDecipheriv('aes256', key, initVect);
        const writestream = fs.createWriteStream(getPath(filepath));   

        readstream
            .pipe(decipher)
            .pipe(writestream);
    });
}

module.exports = decrypt;
