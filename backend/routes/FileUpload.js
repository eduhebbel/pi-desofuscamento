const router = require("express").Router();
const { check, validationResult } = require('express-validator');

const multer = require("multer");

const decodeAll = require('../desofuscamento/index');
const fs = require('fs');
const readline = require('readline');
const { once } = require("events");


const upload = multer({
    dest: process.env.UPLOAD_DIR,
    fileFilter: (req, file, cb) => {
        if (file.mimetype != 'text/plain' && !file.mimetype.includes('log')) {
            return cb(new Error(' Formato invalido.'));
        }
        cb(null, true);
    }
}).single('attachment');


router.post('/file', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            res.status(442).send("<div style='top: 50%; left: 50%; width:30em; height: 18em; margin-top: -9em; margin-left: -15em; position:absolute;'> <h2 style='text-align: center;'>Formato inválido</h2> <div style='text-align: center;'><p>O arquivo enviado, deve ser do formato .txt</p><input type='button' value='Ok' onclick='history.go(-1)'></div></div>");
        } else {
            let file = req.file;
            const path = await processFile(file);
            if (path) {
                res.download(path, file.originalname);
            } else {
                console.log('erro desofuscando arquivo');
                res.status(500).send({ erro: 'erro desofuscando arquivo' });
            }
        }
    });
});

router.post('/text', [
    check('text', 'Um Texto ofuscado é necessária no campo Texto Ofuscado!')
        .trim()
        .isString()
        .notEmpty(),
], (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()){
        res.status(400).json({ errors: validationErrors.errors});
        return
    }

    const encodedString = req.body.text;
    try {
        const decodedString = decodeAll(encodedString);
        res.status(200).send({ decodedString: decodedString });
    } catch {
        res.status(500).send({ 
            error: 'error decoding string',
            encodedString: encodedString
        });
    }
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