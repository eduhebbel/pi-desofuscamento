const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const muser = require('../models/musers');


require('dotenv').config();


router.port('/', [
check('email', 'Por favor, informe um email de usuario valido!')
.trim()
.escape()
.notEmpty(),
check('senha', 'Senha invalida!')
.trim()
.escape()
.notEmpty()
], (req, res) => {

const erros = validationResult(req)    

    if(erros.isEmpty){

        muser.findOne({
            where: { email: req.body.email}
        }).then(muser => {
            bcrypt.compare(req.body.senha, muser.senha)
            .then(result => {
                if (result) {
                    
                    const token = jwt.sign({
                      nome: muser.nome,
                      email: muser.email
                    }, process.env.SECRET);

                    return res.json({
                        token: token
                    });

                } else {
                    return res.status(404).json({
                        error: [{
                            value: '',
                            msg: 'Usuario e senha incorretos.'
                        }]
                    })
                }
            })
        }).catch(erros => {
           return res.status(500).json({
               erros: [{
                   value: '',
                   msg: 'Falha na comunicação com o banco.'
               }]
           }) 
        });

    } else {
        return res.status(422).json(erros);
    }

})

module.exports =  router;