const express = require('express');//Chama o modulo express
const cors = require('cors');//Chama o modulo cors
const userRouter = require('./routes/users');//Caminho das rotas

const app = express();

const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use('/users', userRouter);

app.listen(port, () => console.log(`App running at port ${port}`));