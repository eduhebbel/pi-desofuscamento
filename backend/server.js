const express = require('express');//Chama o modulo express
const cors = require('cors');//Chama o modulo cors
const fs = require('fs');
require('dotenv').config();

const userRouter = require('./routes/users');//Caminho das rotas
const fileUploadRouter = require('./routes/FileUpload');//Caminho da rota de Upload de Arquivo

const app = express();

const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use('/users', userRouter);
app.use('/upload', fileUploadRouter);

fs.access(process.env.OUTDIR, fs.constants.F_OK, (err) => {
    if(err){
        fs.mkdir(process.env.OUTDIR, (err) => {
            if (err) throw err;
            console.log(`${process.env.OUTDIR} criado com sucesso!`);
        });
    } else {
        fs.stat(process.env.OUTDIR, (err, stats) => {
            if (err) throw err;
            if (!stats.isDirectory()) {
                throw new Error(`${process.env.OUTDIR} existe mas não é um diretorio`)
            }
        
        })
    }
})

app.listen(port, () => console.log(`App running at port ${port}`));