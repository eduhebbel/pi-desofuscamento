const express = require('express');
const userRouter = require('./users/users');

const app = express();

const port = 3001;

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use('/users', userRouter);

app.listen(port, () => console.log(`running in port ${port}`));