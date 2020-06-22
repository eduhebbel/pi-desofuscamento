const fs = require('fs');

const baseDir = 'files';
const outputFiles = baseDir + '/' + 'output_files';
const uploadedFiles = baseDir + '/' + 'uploaded_files';

const fileStruct = [baseDir, outputFiles, uploadedFiles];


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