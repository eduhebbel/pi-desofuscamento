const router = require("express").Router();
const multer =  require("multer");
const fs = require('fs');
const readline = require('readline');
const { once } = require('events');

const upload = multer ({
    dest: 'upload_file/',
    fileFilter: (req,file, cb) => {
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

            res.status(442).send({ erro: 'Formato invalido'} )

        } else {
            let file = req.file;
            console.log(file);

            const path = await processFile(file);

            if(path){
                res.download(path, file.originalname);
            } else {
                res.status(500).send();
            }
            
        }
       

    });
});//Fim do Post

async function processFile(file) {
    const outpath = `${process.env.OUTDIR}/${file.filename}`;
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
            writeStream.write(`${line.toUpperCase()}\n`);
    });

    readInterface.on('close', () => {
        writeStream.end();
    });

    await once(readInterface, 'close');
    
    console.log(outpath);
    return outpath;
}

module.exports = router;