const fs = require('fs');
require('dotenv').config();

const fileStruct = [process.env.BASE_DIR, process.env.OUTPUT_DIR, process.env.UPLOAD_DIR];


function createDir(dir) {
    fs.access(dir, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdirSync(dir, (err) => {
                if (err) throw err;
                console.log(`${dir} criado com sucesso!`);
            });
        } else {
            fs.stat(dir, (err, stats) => {
                if (err) throw err;
                if (!stats.isDirectory()) {
                    throw new Error(`${dir} existe mas não é um diretorio`)
                }
            });
        }
    });
}

function createFileStruct() {
    fileStruct.forEach(file => createDir(file));
}

module.exports = createFileStruct;