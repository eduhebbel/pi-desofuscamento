const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const musers = require('../models/musers');
const { encrypt, encryptSync } = require('../password/encript');
const bcryptModule = require('bcrypt');


//Inicio do Solicita lista completa de Usuarios
router.get('/', (req, res) => {
    musers.findAll({ attributes: ['nome', 'email'], }).then(musers => {
        if (musers.length > 0) {
            return res.json({
                data: musers
            });
        } else {
            res.status(404).json({
                erros: [{
                    value: '',
                    msg: 'Nenhum Usuario encontrado!'
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
});//Fim do Solicita lista completa de Usuarios

//Inicio do Solicita usuario por ID
router.get('/:id', [
    check('id', '"id deve ser um numero inteiro e correspondente à usuário existente!')
        .trim()
        .escape()
        .isInt()
        .toInt()
        .notEmpty()
], (req, res) => {

    const erros = validationResult(req);

    if (erros.isEmpty()) {
        musers.findByPk(req.params.id).then(musers => {
            if (musers) {
                return res.json({
                    data: [musers]
                });
            } else {
                return res.status(404).json({
                    erros: [{
                        value: '',
                        msg: 'Usuario não encontrado com esse id!'
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
    } else {
        return res.status(422).json(erros);
    }

});//Fim do Solicita usuario por ID

//Inicio do Cadastra novo usuario
router.post('/', [
    check('nome', 'Nome é um campo obrigatorio.')
        .trim()
        .escape()
        .notEmpty(),
    check('senha', 'Senha é um campo obrigatorio.')
        .trim()
        .escape()
        .notEmpty(),
    check('email', 'E-mail, com valor válido, é um campo obrigatorio.')
        .trim()
        .escape()
        .notEmpty()
], (req, res) => {

    if (erros.isEmpty()) {
        bcryptModule.hash(req.body.senha, 11, (err, hash) => {
            if (err) {
                throw err;
            }
            musers.create({
                nome: req.body.nome,
                senha: hash,
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
                        msg: 'Falha na comunicação com o Banco!',
                    }]
                });
            });
        })
    } else {
        return res.status(422).json(erros);
    }
});//Fim do Cadastra novo usuario

//Inicio do Altera um usuario
router.put('/:id', [
    check('id', '"ID deve ser um numero inteiro e correspondente à usuário existente!')
        .trim()
        .escape()
        .isInt()
        .toInt()
        .notEmpty(),
    check('nome', 'Nome é um campo obrigatorio.')
        .trim()
        .escape()
        .notEmpty(),
    check('senha', 'Senha é um campo obrigatorio.')
        .trim()
        .escape()
        .notEmpty(),
    check('email', 'E-mail, com valor válido, é um campo obrigatorio.')
        .trim()
        .escape()
        .notEmpty()
], (req, res) => {
    const erros = validationResult(req);

    if (erros.isEmpty()) {
        musers.update({
            nome: req.body.nome,
            senha: req.body.senha,
            email: req.body.email
        }, {
            where: {
                id: req.params.id
            }
        }).then(rows => {
            if (rows[0] === 1) {
                return res.json({
                    data: [{
                        rows: rows[0],
                        nome: req.body.nome,
                        senha: req.body.senha,
                        email: req.body.email
                    }]
                })
            } else if (rows[0] === 0) {
                return res.status(404).json({
                    erros: [{
                        value: '',
                        msg: 'Usuario não encontrado!'
                    }]
                });
            } else {
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
    } else {
        return res.status(422).json(erros);
    }
});//Fim do Altera um usuario

//Inicio do Deleta um Usuario
router.delete('/:id', [
    check('id', '"ID deve ser um numero inteiro e correspondente à usuário existente!')
        .trim()
        .escape()
        .isInt()
        .toInt()
        .notEmpty()
], (req, res) => {
    const erros = validationResult(req);

    if (erros.isEmpty()) {
        musers.destroy({
            where: {
                id: req.params.id
            }
        }).then(rows => {
            if (rows === 1) {
                return res.json({
                    data: [{
                        rows: rows

                    }]
                })
            } else if (rows === 0) {
                return res.status(404).json({
                    erros: [{
                        value: '',
                        msg: 'Usuario não encontrado!'
                    }]
                });
            } else {
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
    } else {
        return res.status(422).json(erros);
    }//fim di IF-ELSE
});//Fim do Deleta um usuario

module.exports = router;
