const router = require('express').Router();

router.get(`/`, (req, res) => {
    res.send('<h1>teste get geral 1</h1>')
});//solicita lista completa

router.get(`/:id`, (req, res) => {
    res.send(`<h1>teste get o ${req.params.id} </h1>`)
});//solicita pro ID

router.post('/', (req, res) => {
    res.send('<h1>Cria um usuario</h1>')
});//Cadastra novo usuario

router.put('/:id', (req, res) => {
    res.send(`<h1>Edita um usuario ${req.params.id}</h1>`)
});//Altera um usuario

router.delete('/:id', (req, res) => {
    res.send(`<h1>Remove um usuario ${req.params.id}</h1>`)
});//Deleta um usuario

module.exports = router;