const router = require("express").Router();
const {check, validationResult} = require('express-validator');
const musers = require('../models/musers');


//Inicio do Solicita lista completa de Usuarios
router.get('/', (req, res) => {
    
    musers.findAll().then(musers =>{
        if(musers.length > 0 ){
            return res.json({
                data: musers
            });
        } else{
            res.status(404).json({
                erros: [{
                    value: '',
                    msg: 'Nenhum Usuario encontrado!'
                }]
            });
        }
    });

});//Fim do Solicita lista completa de Usuarios

//Inicio do Solicita usuario por ID
router.get('/:id', (req, res) => {
    check('id', '"ID" de ser um numero inteiro!')
    .trim()
    .escape()
    .isInt()
    .toInt()
    .notEmpty()

    const erros = validationResult(req);
    
    if(erros.isEmpty()){
        musers.findByPk(req.params.id).then(musers => {
            if(musers){
                return res.json({
                data: [musers]
                    });
            } else{
                return res.status(404).json({
                    erros: [{
                        value: '',
                        msg: 'Usuario não encontrado!'
                    }]
                })
            }
            }).catch(erros => {
                console.log(erros);
                return res.status(500).json({
                    erros: [{
                        value: '',
                        msg: 'Falha na comunicação com o Banco!'
                    }]
                });
            });
    }else{
        return res.status(422).json(erros);
    }//fim di IF-ELSE

});//Fim do Solicita usuario por ID

//Inicio do Cadastra novo usuario
router.post('/', [
    check('nome' , '"Nome" é um campo obrigatorio.',
    'senha' , '"Senha" é um campo obrigatorio.',
    'email', '"E-mail" é  um campo obrigatorio')
    .trim()
    .escape()
    .notEmpty(),
    check(
    'senha' , '"Senha" é um campo obrigatorio.')
    .trim()
    .escape()
    .notEmpty(),
    check('email', '"E-mail" é  um campo obrigatorio')
    .trim()
    .escape()
    .notEmpty()
    ], (req, res) => {
    const erros = validationResult(req);
    
    if(erros.isEmpty()){
        musers.create({
            nome: req.body.nome,
            senha: req.body.senha,
            email: req.body.email
        }).then(musers => {
            return res.json({
              data: [musers]
                });
            }).catch(erros => {
                console.log(erros);
                return res.status(500).json({
                    erros: [{
                        value: '',
                        msg: 'Flha na comunicação com o Banco!'
                    }]
                });
            });
    }else{
        return res.status(422).json(erros);
    }//fim di IF-ELSE
});//Fim do Cadastra novo usuario

//Inicio do Altera um usuario
router.put('/:id',[
    check('id', '"ID" de ser um numero inteiro!')
    .trim()
    .escape()
    .isInt()
    .toInt()
    .notEmpty(),
    check('nome' , '"Nome" é um campo obrigatorio.',
    'senha' , '"Senha" é um campo obrigatorio.',
    'email', '"E-mail" é  um campo obrigatorio')
    .trim()
    .escape()
    .notEmpty(),
    check(
    'senha' , '"Senha" é um campo obrigatorio.')
    .trim()
    .escape()
    .notEmpty(),
    check('email', '"E-mail" é  um campo obrigatorio')
    .trim()
    .escape()
    .notEmpty()
] ,(req, res) => {
    const erros = validationResult(req);
    
    if(erros.isEmpty()){
        musers.update({
            nome: req.body.nome,
            senha: req.body.senha,
            email: req.body.email
        }, {
            where: {
                id: req.params.id
            }
        }).then(rows => {
            if(rows[0] === 1){
                return res.json({
                    data: [{
                      rows: rows[0],
                      nome: req.body.nome,
                      senha: req.body.senha,
                      email: req.body.email  
                    }]
                })
            } else if (rows[0] === 0){
                return res.status(404).json({
                    erros: [{
                        value: '',
                        msg: 'Usuario não encontrado!'
                    }]
                });
            } else{
                console.log(erros);
                return res.status(500).json({
                    erros: [{
                        value: '',
                        msg: 'Falha na comunicação com o Banco!'
                    }]
                });
            }
            }).catch(erros => {
                console.log(erros);
                return res.status(500).json({
                    erros: [{
                        value: '',
                        msg: 'Falha na comunicação com o Banco!'
                    }]
                });
            });
    }else{
        return res.status(422).json(erros);
    }//fim di IF-ELSE
});//Fim do Altera um usuario

//Inicio do Deleta um Usuario
router.delete('/:id',[
    check('id', '"ID" de ser um numero inteiro!')
    .trim()
    .escape()
    .isInt()
    .toInt()
    .notEmpty()
], (req, res) => {
    const erros = validationResult(req);
    
    if(erros.isEmpty()){
        musers.destroy({
            where: {
                id: req.params.id
            }
        }).then(rows => {
            if(rows === 1){
                return res.json({
                    data: [{
                      rows: rows
                      
                    }]
                })
            } else if (rows === 0){
                return res.status(404).json({
                    erros: [{
                        value: '',
                        msg: 'Usuario não encontrado!'
                    }]
                });
            } else{
                console.log(erros);
                return res.status(500).json({
                    erros: [{
                        value: '',
                        msg: 'Falha na comunicação com o Banco!'
                    }]
                });
            }
            }).catch(erros => {
                console.log(erros);
                return res.status(500).json({
                    erros: [{
                        value: '',
                        msg: 'Falha na comunicação com o Banco!'
                    }]
                });
            });
    }else{
        return res.status(422).json(erros);
    }//fim di IF-ELSE
});//Fim do Deleta um usuario

module.exports = router;
