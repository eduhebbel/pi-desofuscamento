const fs = require('fs');
require('dotenv').config();

const fileStruct = [process.env.OUTPUT_DIR, process.env.UPLOAD_DIR];


function createDir(dir) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true }, err => {
            if (err){
                throw new Error('falhou ao criar os diretorios')
            }
        })
    };
}

function createFileStruct() {
    fileStruct.forEach(file => createDir(file));
}

module.exports = createFileStruct;