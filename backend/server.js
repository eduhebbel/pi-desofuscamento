const express = require('express');//Chama o modulo express
const cors = require('cors');//Chama o modulo cors

const createFileStruct = require('./createFileStruct');

require('dotenv').config();

const userRouter = require('./routes/users');
const fileUploadRouter = require('./routes/FileUpload');
const loginRouter = require('./routes/login');

const auth = require('./auth');

const app = express();

const port = 3001;

app.use(express.json());
app.use(cors());

app.use('/users', auth, userRouter);
app.use('/upload',  fileUploadRouter);
app.use('/login' , loginRouter);
createFileStruct();

app.listen(port, () => console.log(`App running at port ${port}`));