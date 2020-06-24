const router = require("express").Router();
const { check } = require('express-validator');

const multer =  require("multer");

const decodeAll = require('../desofuscamento/index');
const fs = require('fs');
const readline = require('readline');
const { once }  = require("events");
// console.log(once);
// console.log(typeof(once));


const upload = multer ({
    dest: process.env.UPLOAD_DIR,
    fileFilter: (req, file, cb) => {
        if(file.mimetype != 'text/plain' && !file.mimetype.includes('log')){
            return cb(new Error('Formato invalido.'));
        }
        cb(null, true);
    }
}).single('attachment');


router.post('/file', (req, res) => {
    upload(req, res, async (err) => {
        if(err) {
            console.log(err);
            res.status(442).send({ erro: 'Formato invalido'});
        } else {
            let file = req.file;

            const path = await processFile(file);

            if(path){
                res.download(path, file.originalname);
            } else {
                console.log('erro desofuscando arquivo');
                res.status(500).send({erro: 'erro desofuscando arquivo'});
            }
            
        }
       

    });
});

router.post('/text', [
        check('text', 'uma frase ofuscada é necessária')
        .trim()
],(req, res) => {
    res.status(501).send({ erro: 'not implemented'});
});

async function processFile(file) {
    const outpath = `${process.env.OUTPUT_DIR}/${file.filename}`;
    const writeStream = fs.createWriteStream(outpath, {
        flags: 'a'
    });

    writeStream.on('error', (err) => {
        console.log(err);
        throw err;
    });

    const readInterface = readline.createInterface({
        input: fs.createReadStream(file.path)
    });

    readInterface.on('line', (line) => {
            writeStream.write(`${decodeAll(line)}\n`);
    });

    readInterface.on('close', () => {
        writeStream.end();
    });
    
    await once(writeStream, 'finish');
    
    return outpath;
}

module.exports = router;